export const validatorAddress = "0x48D38d1E9314BDA242e9cf21C6d381f4BB026F1c"
export const collectorAddress = "0xdC29998D9d7e24f8EE1C77205ED710a23518cA6b"
export const validatorAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "validator",
				"type": "address"
			}
		],
		"name": "addValidator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "validator",
				"type": "address"
			},
			{
				"internalType": "enum ValidatorStatus",
				"name": "newStatus",
				"type": "uint8"
			}
		],
		"name": "setValidatorStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "validator",
				"type": "address"
			}
		],
		"name": "ValidatorAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "validator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum ValidatorStatus",
				"name": "newStatus",
				"type": "uint8"
			}
		],
		"name": "ValidatorStatusChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getActiveAddresses",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "validatorAddresses",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "validators",
		"outputs": [
			{
				"internalType": "enum ValidatorStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "validator",
				"type": "address"
			}
		],
		"name": "validatorStatus",
		"outputs": [
			{
				"internalType": "enum ValidatorStatus",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export const collectorAbi =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_offerIndex",
				"type": "uint256"
			}
		],
		"name": "acceptOffer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_submissionIndex",
				"type": "uint256"
			}
		],
		"name": "acceptSubmission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_validator",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_publicKey",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_request",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_validationFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxParticipants",
				"type": "uint256"
			}
		],
		"name": "createCollection",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_collectionIndex",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_creator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_uri",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_publicKey",
				"type": "bytes32"
			}
		],
		"name": "createOffer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_collectionIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_uri",
				"type": "string"
			}
		],
		"name": "createSubmission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_offerIndex",
				"type": "uint256"
			}
		],
		"name": "rejectOffer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_submissionIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_reason",
				"type": "string"
			}
		],
		"name": "rejectSubmission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_validatorsContract",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "collectionIndex",
				"type": "uint256"
			}
		],
		"name": "SubmissionAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "collectionIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			}
		],
		"name": "SubmissionRejected",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_offerIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			}
		],
		"name": "updateOffer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "collections",
		"outputs": [
			{
				"internalType": "address",
				"name": "validator",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "publicKey",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "deposit",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "request",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "validationFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxParticipants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "acceptedSubmissionCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCollections",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "validator",
						"type": "address"
					},
					{
						"internalType": "bytes32",
						"name": "publicKey",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "deposit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "request",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "validationFee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxParticipants",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "acceptedSubmissionCount",
						"type": "uint256"
					}
				],
				"internalType": "struct Collector.Collection[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllOffers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "collectionIndex",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "deposit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "requestURI",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "publicKey",
						"type": "bytes32"
					},
					{
						"internalType": "enum Collector.OfferStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "resultURI",
						"type": "string"
					}
				],
				"internalType": "struct Collector.Offer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSubmission",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "collectionIndex",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "submitter",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "uri",
						"type": "string"
					},
					{
						"internalType": "enum Collector.SubmissionStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct Collector.Submission[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getCollectionByIndex",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "validator",
						"type": "address"
					},
					{
						"internalType": "bytes32",
						"name": "publicKey",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "deposit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "request",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "validationFee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxParticipants",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "acceptedSubmissionCount",
						"type": "uint256"
					}
				],
				"internalType": "struct Collector.Collection",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCollectionCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startPage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "getCollectionsByPage",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "validator",
						"type": "address"
					},
					{
						"internalType": "bytes32",
						"name": "publicKey",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "deposit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "request",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "validationFee",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxParticipants",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "acceptedSubmissionCount",
						"type": "uint256"
					}
				],
				"internalType": "struct Collector.Collection[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getOffersByAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "collectionIndex",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "deposit",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "requestURI",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "publicKey",
						"type": "bytes32"
					},
					{
						"internalType": "enum Collector.OfferStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "resultURI",
						"type": "string"
					}
				],
				"internalType": "struct Collector.Offer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getOffersCountByAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getSubmissionByAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "collectionIndex",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "submitter",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "uri",
						"type": "string"
					},
					{
						"internalType": "enum Collector.SubmissionStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct Collector.Submission[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getSubmissionCountByAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "collectionIndex",
				"type": "uint256"
			}
		],
		"name": "getSubmissionCountByCollectionIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "collectionIndex",
				"type": "uint256"
			}
		],
		"name": "getSubmissionsByCollectionIndex",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "collectionIndex",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "submitter",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "uri",
						"type": "string"
					},
					{
						"internalType": "enum Collector.SubmissionStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct Collector.Submission[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "offers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "collectionIndex",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "deposit",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "requestURI",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "publicKey",
				"type": "bytes32"
			},
			{
				"internalType": "enum Collector.OfferStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "resultURI",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "submissions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "collectionIndex",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "submitter",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			},
			{
				"internalType": "enum Collector.SubmissionStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "validatorsContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]