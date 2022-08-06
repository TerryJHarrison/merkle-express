import {Divider, Typography} from "@mui/material";
import CodeBlock from "./CodeBlock";
import React from "react";

const SolidityCode = ({styles, merkleRoot}) => {
  return <>
    <Typography variant="h3" className={styles.topPadded}>Solidity</Typography>
    <Typography variant="h6" className={styles.topPadded}>Setup</Typography>
    <CodeBlock styles={styles} id="soliditySetup" content="npm install @openzeppelin/contracts"/>

    <Divider className={styles.topPadded}/>
    <Typography variant="h6" className={styles.topPadded}>Implementation</Typography>
    <CodeBlock styles={styles} id="solidityImplementation" content={<span>
      import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";<br/>
      <br/>
      bytes32 public merkleRoot = {merkleRoot};<br/>
      <br/>
      function checkAddress(bytes32 calldata _proof) returns bool &#123;<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;return MerkleProof.verify(_proof, merkleRoot, keccak256(abi.encodePacked(msg.sender)));<br/>
      &#125;
      </span>}/>
  </>
}

export default SolidityCode;