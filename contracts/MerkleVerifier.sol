// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

// @title Merkle Verifier
// @notice Public utility to verify merkle proofs, for either the caller or passed in addresses
contract MerkleVerifier {

    // @notice Verify caller's address against provided root and proof
    function verify(bytes32[] calldata proof, bytes32 root)
    external view returns (bool) {
        return MerkleProof.verify(proof, root, keccak256(abi.encodePacked(msg.sender)));
    }

    // @notice Verify address against root and proof
    function verify(bytes32[] memory proof, bytes32 root, address target)
    public pure returns (bool) {
        return MerkleProof.verify(proof, root, keccak256(abi.encodePacked(target)));
    }

    // @notice Verify leaf against root and proof
    // @dev Can be used with any type of data, not just addresses
    function verify(bytes32[] calldata proof, bytes32 root, bytes32 target)
    external pure returns (bool) {
        return MerkleProof.verify(proof, root, keccak256(abi.encodePacked(target)));
    }
}
