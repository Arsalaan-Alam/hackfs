pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

enum ValidatorStatus {
    Undefined,
    Active,
    Inactive
}

interface ValidatorsContract {
    function validatorStatus(
        address validator
    ) external view returns (ValidatorStatus);
}

contract Collector {
    enum SubmissionStatus {
        Initial,
        Accepted,
        Rejected
    }

    enum OfferStatus {
        Pending,
        Accepted,
        Rejected
    }

    struct Collection {
        address validator;
        bytes32 publicKey;
        uint256 deposit;
        string request;
        uint256 validationFee;
        uint256 maxParticipants;
        uint256 acceptedSubmissionCount;
    }

    struct Submission {
        uint256 collectionIndex;
        address submitter;
        string uri;
        SubmissionStatus status;
    }

    struct Offer {
        uint256 collectionIndex;
        uint256 deposit;
        string requestURI;
        bytes32 publicKey;
        OfferStatus status;
        string resultURI;
    }

    Collection[] public collections;
    Submission[] public submissions;
    Offer[] public offers;

    address public validatorsContract;

    event SubmissionAccepted(
        uint256 indexed submissionIndex,
        uint256 indexed collectionIndex
    );
    event SubmissionRejected(
        uint256 indexed submissionIndex,
        uint256 indexed collectionIndex,
        string reason
    );

    constructor(address _validatorsContract) {
        validatorsContract = _validatorsContract;
    }

    function createCollection(
        address _validator,
        bytes32 _publicKey,
        string calldata _request,
        uint256 _validationFee,
        uint256 _maxParticipants
    ) public payable {
        ValidatorsContract validators = ValidatorsContract(validatorsContract);
        require(
            validators.validatorStatus(_validator) == ValidatorStatus.Active,
            "Invalid validator"
        );
        require(
            _maxParticipants > 0,
            "Max participants must be greater than zero"
        );

        Collection memory newCollection = Collection(
            _validator,
            _publicKey,
            msg.value, // Set deposit value to the amount of Ether sent in the transaction
            _request,
            _validationFee,
            _maxParticipants,
            0
        );

        collections.push(newCollection);
    }

    function getCollectionByIndex(
        uint256 index
    ) public view returns (Collection memory) {
        require(index < collections.length, "Invalid collection index");

        return collections[index];
    }

    function getCollectionCount() public view returns (uint256) {
        return collections.length;
    }

    function getAllCollections() public view returns (Collection[] memory) {
        return collections;
    }

    function getCollectionsByPage(
        uint256 startPage,
        uint256 count
    ) public view returns (Collection[] memory) {
        require(startPage > 0, "Start page must be greater than zero");
        require(count > 0, "Count must be greater than zero");

        uint256 startIndex = (startPage - 1) * count;
        uint256 endIndex = startIndex + count;

        require(endIndex <= collections.length, "Invalid start page or count");

        Collection[] memory result = new Collection[](count);
        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = collections[i];
        }

        return result;
    }

    function createSubmission(
        uint256 _collectionIndex,
        string calldata _uri
    ) public {
        require(
            _collectionIndex < collections.length,
            "Invalid collection index"
        );
        Collection storage collection = collections[_collectionIndex];

        Submission memory newSubmission = Submission(
            _collectionIndex,
            msg.sender,
            _uri,
            SubmissionStatus.Initial
        );

        submissions.push(newSubmission);

        collection.acceptedSubmissionCount++;
    }

    function getSubmissionCountByCollectionIndex(
        uint256 collectionIndex
    ) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < submissions.length; i++) {
            if (submissions[i].collectionIndex == collectionIndex) {
                count++;
            }
        }
        return count;
    }

    function getSubmissionsByCollectionIndex(
        uint256 collectionIndex
    ) public view returns (Submission[] memory) {
        uint256 count = getSubmissionCountByCollectionIndex(collectionIndex);
        Submission[] memory result = new Submission[](count);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < submissions.length; i++) {
            if (submissions[i].collectionIndex == collectionIndex) {
                result[currentIndex] = submissions[i];
                currentIndex++;
            }
        }

        return result;
    }

    function acceptSubmission(uint256 _submissionIndex) public {
        require(
            _submissionIndex < submissions.length,
            "Invalid submission index"
        );
        Submission storage submission = submissions[_submissionIndex];

        require(
            msg.sender == collections[submission.collectionIndex].validator,
            "Sender is not the validator of the collection"
        );
        require(
            submission.status == SubmissionStatus.Initial,
            "Submission status is not initial"
        );

        submission.status = SubmissionStatus.Accepted;

        uint256 collectionIndex = submission.collectionIndex;
        Collection storage collection = collections[collectionIndex];
        uint256 amountToSend = collection.deposit / collection.maxParticipants;

        // Transfer the calculated amount to the submitter
        payable(submission.submitter).transfer(amountToSend);

        emit SubmissionAccepted(
            _submissionIndex,
            submissions[_submissionIndex].collectionIndex
        );
    }

    function rejectSubmission(
        uint256 _submissionIndex,
        string memory _reason
    ) public {
        require(
            _submissionIndex < submissions.length,
            "Invalid submission index"
        );
        Submission storage submission = submissions[_submissionIndex];

        require(
            msg.sender == collections[submission.collectionIndex].validator,
            "Sender is not the validator of the collection"
        );
        require(
            submission.status == SubmissionStatus.Initial,
            "Submission status is not initial"
        );

        submission.status = SubmissionStatus.Rejected;

        emit SubmissionRejected(
            _submissionIndex,
            submissions[_submissionIndex].collectionIndex,
            _reason
        );
    }

    function createOffer(
        uint256 _collectionIndex,
        string calldata _uri,
        bytes32 _publicKey
    ) public payable {
        require(
            _collectionIndex < collections.length,
            "Invalid collection index"
        );

        Offer memory newOffer = Offer({
            collectionIndex: _collectionIndex,
            deposit: msg.value,
            requestURI: _uri,
            publicKey: _publicKey,
            status: OfferStatus.Pending,
            resultURI: ""
        });

        offers.push(newOffer);
    }
        function getSubmissionCountByAddress(
        address _address
    ) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < submissions.length; i++) {
            if (submissions[i].submitter == _address) {
                count++;
            }
        }
        return count;
    }


    function getSubmissionByAddress(address _address) public view returns(Submission[] memory){
        uint256 count = getSubmissionCountByAddress(_address);
        Submission[] memory result = new Submission[](count);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < submissions.length; i++) {
            if (submissions[i].submitter == _address) {
                result[currentIndex] = submissions[i];
                currentIndex++;
            }
        }
        return result;


    }
    function getAllSubmission() public view returns(Submission[] memory){
        return submissions;
    }

    function getAllOffers() public view returns(Offer[] memory){
        return offers;
    }
}