import {Divider, Typography} from "@mui/material";
import CodeBlock from "./CodeBlock";
import React from "react";

const JavaScriptCode = ({styles, addressListInput}) => {
  const addressList = addressListInput.split(/[;,\n\r\s]+/g).filter(x => x !== "").map(x => <>&nbsp;&nbsp;&nbsp;&nbsp;{x},<br/></>);
  return <>
    <Typography variant="h3" className={styles.topPadded}>JavaScript</Typography>
    <Typography variant="h6" className={styles.topPadded}>Setup</Typography>
    <CodeBlock styles={styles} id="jsSetup" content="npm install merkeltreejs keccack256"/>

    <Divider className={styles.topPadded}/>
    <Typography variant="h6" className={styles.topPadded}>Implementation</Typography>
    <CodeBlock styles={styles} id="jsImplementation" content={<span>
        import &#123;MerkleTree&#125; from 'merkletreejs';<br/>
        import keccak256 from 'keccak256';<br/>
        <br/>
        const addresses = [<br/>
      {addressList}
      ].map(a => keccak256(a));<br/>
        <br/>
        const merkleTree = new MerkleTree(addresses, keccak256, &#123;sortPairs: true&#125;);<br/>
        const getProof = address => return merkleTree.getHexProof(keccak256(address));<br/>
        const checkAddress = address => return merkleTree.verify(getProof(address), keccak256(address), merkleTree.getHexRoot());<br/>
      </span>}/>
  </>
}

export default JavaScriptCode;