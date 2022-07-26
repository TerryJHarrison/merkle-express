const MerkleVerifier = artifacts.require("MerkleVerifier");
const {MerkleTree} = require('merkletreejs');
const keccak256  = require('keccak256');

contract("MerkleVerifier", ([a1, a2, a3, a4]) => {
  let merkleVerifier;
  const leaves = [a1, a2, a3].map(a => keccak256(a));
  const tree = new MerkleTree(leaves, keccak256, {sortPairs: true});
  const root = tree.getHexRoot();
  const proofs = leaves.map(l => tree.getHexProof(l));

  before(async () => {
    merkleVerifier = await MerkleVerifier.new();
  });

  it("can generate the proof client-side", async () => {
    assert.isTrue(tree.verify(proofs[0], leaves[0], root));
  });

  it("verifies the caller's address", async () => {
    assert.equal(await merkleVerifier.verify(proofs[0], root), true);
  });

  it("verifies a provided proof, root, and address", async () => {
    assert.isTrue(await merkleVerifier.verify(proofs[1], root, a2), `Unable to verify address ${a1} against merkle root ${root}`);
  });

  it("disqualifies an ineligible address", async () => {
    assert.equal(await merkleVerifier.verify(tree.getHexProof(keccak256(a4)), root, a4), false);
  });
})