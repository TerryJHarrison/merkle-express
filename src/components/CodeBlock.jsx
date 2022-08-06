import {Container, IconButton, Typography} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from "react";
import { track } from '@amplitude/analytics-browser';

export const CodeBlock = ({styles, content, id}) => {

  const copyToClipboard = () => {
    try {
      if(typeof content === "string"){
        navigator.clipboard.writeText(content);
      } else {
        navigator.clipboard.writeText(document.getElementById(id).innerText);
      }
      track('Copy Code', {
        textCopied: id
      });
    } catch (e){
      console.warn("Could not copy text to clipboard", e);
    }
  };

  return (
    <>
      <IconButton onClick={copyToClipboard} className={styles.copyButton}>
        <ContentCopyIcon/>
      </IconButton>
      <Container className={styles.codeBlock}>
        <Typography id={id} variant="code">{content}</Typography>
      </Container>
    </>
  )
}

export default CodeBlock;