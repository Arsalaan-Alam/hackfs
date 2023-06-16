pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

enum ValidatorStatus {
    Undefined,
    Active,
    Inactive
}

contract Validators {
    // The admin (DAO multisig) account
    address public admin;

    // A mapping from validator addresses to their status
    mapping(address => ValidatorStatus) public validators;

    // An array of all seen validator addresses
    address[] public validatorAddresses;

    // Events
    event ValidatorAdded(address indexed validator);
    event ValidatorStatusChanged(
        address indexed validator,
        ValidatorStatus newStatus
    );

    constructor(address _admin) {
        admin = _admin;
    }

    // Add a validator to the registry
    function addValidator(address validator) public onlyAdmin {
        require(validators[validator] == ValidatorStatus.Undefined);
        validators[validator] = ValidatorStatus.Active;
        validatorAddresses.push(validator);
        emit ValidatorAdded(validator);
    }

    // Assumes it exists, otherwise adds to mapping
    function setValidatorStatus(
        address validator,
        ValidatorStatus newStatus
    ) public onlyAdmin {
        require(
            validators[validator] != ValidatorStatus.Undefined,
            "Validator not found"
        );
        require(
            validators[validator] != newStatus,
            "Status is already set to the provided value"
        );

        validators[validator] = newStatus;

        emit ValidatorStatusChanged(validator, newStatus);
    }

    // Get the status of a validator
    function validatorStatus(
        address validator
    ) public view returns (ValidatorStatus) {
        return validators[validator];
    }

    // Get a list of all active validator addresses
    function getActiveAddresses() public view returns (address[] memory) {
        uint256 activeCount = 0;
        // First, count the number of active addresses
        for (uint256 i = 0; i < validatorAddresses.length; i++) {
            if (validators[validatorAddresses[i]] == ValidatorStatus.Active) {
                activeCount++;
            }
        }

        // Create a new dynamic array to store the active addresses
        address[] memory activeAddresses = new address[](activeCount);
        uint256 currentIndex = 0;

        // Populate the activeAddresses array with the active addresses
        for (uint256 i = 0; i < validatorAddresses.length; i++) {
            if (validators[validatorAddresses[i]] == ValidatorStatus.Active) {
                activeAddresses[currentIndex] = validatorAddresses[i];
                currentIndex++;
            }
        }

        return activeAddresses;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }
}
