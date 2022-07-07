export const ERC1155_ABI = '[\n' +
    '  {\n' +
    '    "anonymous": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "account",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "operator",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": false,\n' +
    '        "internalType": "bool",\n' +
    '        "name": "approved",\n' +
    '        "type": "bool"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "ApprovalForAll",\n' +
    '    "type": "event"\n' +
    '  },\n' +
    '  {\n' +
    '    "anonymous": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "operator",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "from",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": false,\n' +
    '        "internalType": "uint256[]",\n' +
    '        "name": "ids",\n' +
    '        "type": "uint256[]"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": false,\n' +
    '        "internalType": "uint256[]",\n' +
    '        "name": "values",\n' +
    '        "type": "uint256[]"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "TransferBatch",\n' +
    '    "type": "event"\n' +
    '  },\n' +
    '  {\n' +
    '    "anonymous": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "operator",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "from",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": false,\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "id",\n' +
    '        "type": "uint256"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": false,\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "value",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "TransferSingle",\n' +
    '    "type": "event"\n' +
    '  },\n' +
    '  {\n' +
    '    "anonymous": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "indexed": false,\n' +
    '        "internalType": "string",\n' +
    '        "name": "value",\n' +
    '        "type": "string"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "id",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "URI",\n' +
    '    "type": "event"\n' +
    '  },\n' +
    '  {\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "account",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "id",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "balanceOf",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address[]",\n' +
    '        "name": "accounts",\n' +
    '        "type": "address[]"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256[]",\n' +
    '        "name": "ids",\n' +
    '        "type": "uint256[]"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "balanceOfBatch",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "uint256[]",\n' +
    '        "name": "",\n' +
    '        "type": "uint256[]"\n' +
    '      }\n' +
    '    ],\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "account",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "operator",\n' +
    '        "type": "address"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "isApprovedForAll",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "bool",\n' +
    '        "name": "",\n' +
    '        "type": "bool"\n' +
    '      }\n' +
    '    ],\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "from",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256[]",\n' +
    '        "name": "ids",\n' +
    '        "type": "uint256[]"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256[]",\n' +
    '        "name": "amounts",\n' +
    '        "type": "uint256[]"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "bytes",\n' +
    '        "name": "data",\n' +
    '        "type": "bytes"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "safeBatchTransferFrom",\n' +
    '    "outputs": [],\n' +
    '    "stateMutability": "nonpayable",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "from",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "id",\n' +
    '        "type": "uint256"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "amount",\n' +
    '        "type": "uint256"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "bytes",\n' +
    '        "name": "data",\n' +
    '        "type": "bytes"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "safeTransferFrom",\n' +
    '    "outputs": [],\n' +
    '    "stateMutability": "nonpayable",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "operator",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "bool",\n' +
    '        "name": "approved",\n' +
    '        "type": "bool"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "setApprovalForAll",\n' +
    '    "outputs": [],\n' +
    '    "stateMutability": "nonpayable",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "bytes4",\n' +
    '        "name": "interfaceId",\n' +
    '        "type": "bytes4"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "supportsInterface",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "bool",\n' +
    '        "name": "",\n' +
    '        "type": "bool"\n' +
    '      }\n' +
    '    ],\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "id",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "uri",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "string",\n' +
    '        "name": "",\n' +
    '        "type": "string"\n' +
    '      }\n' +
    '    ],\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  }\n' +
    ']'


export const ERC721_ABI = '[\n' +
    '  {\n' +
    '    "inputs": [],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "nonpayable",\n' +
    '    "type": "constructor"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": true,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "owner",\n' +
    '        "type": "address"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "balanceOf",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": true,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "tokenId",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "ownerOf",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "",\n' +
    '        "type": "address"\n' +
    '      }\n' +
    '    ],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "from",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "tokenId",\n' +
    '        "type": "uint256"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "bytes",\n' +
    '        "name": "_data",\n' +
    '        "type": "bytes"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "safeTransferFrom",\n' +
    '    "outputs": [],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "nonpayable",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "from",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "tokenId",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "safeTransferFrom",\n' +
    '    "outputs": [],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "nonpayable",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "from",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "tokenId",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "transferFrom",\n' +
    '    "outputs": [],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "nonpayable",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "tokenId",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "approve",\n' +
    '    "outputs": [],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "nonpayable",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "bool",\n' +
    '        "name": "approved",\n' +
    '        "type": "bool"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "setApprovalForAll",\n' +
    '    "outputs": [],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "nonpayable",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": true,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "tokenId",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "getApproved",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "",\n' +
    '        "type": "address"\n' +
    '      }\n' +
    '    ],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": true,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "owner",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "internalType": "address",\n' +
    '        "name": "operator",\n' +
    '        "type": "address"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "isApprovedForAll",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "bool",\n' +
    '        "name": "",\n' +
    '        "type": "bool"\n' +
    '      }\n' +
    '    ],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "constant": true,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "internalType": "bytes4",\n' +
    '        "name": "interfaceId",\n' +
    '        "type": "bytes4"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "supportsInterface",\n' +
    '    "outputs": [\n' +
    '      {\n' +
    '        "internalType": "bool",\n' +
    '        "name": "",\n' +
    '        "type": "bool"\n' +
    '      }\n' +
    '    ],\n' +
    '    "payable": false,\n' +
    '    "stateMutability": "view",\n' +
    '    "type": "function"\n' +
    '  },\n' +
    '  {\n' +
    '    "anonymous": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "from",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "to",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "tokenId",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "Transfer",\n' +
    '    "type": "event"\n' +
    '  },\n' +
    '  {\n' +
    '    "anonymous": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "owner",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "approved",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "uint256",\n' +
    '        "name": "tokenId",\n' +
    '        "type": "uint256"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "Approval",\n' +
    '    "type": "event"\n' +
    '  },\n' +
    '  {\n' +
    '    "anonymous": false,\n' +
    '    "inputs": [\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "owner",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": true,\n' +
    '        "internalType": "address",\n' +
    '        "name": "operator",\n' +
    '        "type": "address"\n' +
    '      },\n' +
    '      {\n' +
    '        "indexed": false,\n' +
    '        "internalType": "bool",\n' +
    '        "name": "approved",\n' +
    '        "type": "bool"\n' +
    '      }\n' +
    '    ],\n' +
    '    "name": "ApprovalForAll",\n' +
    '    "type": "event"\n' +
    '  }\n' +
    ']'