import { ethers, BigNumber } from "ethers";
import fs from "fs";

import { ERC20SimpleSwap__factory } from "./contracts/factories/ERC20SimpleSwap__factory";
import trustedNodes from "./trusted_nodes.json";

const INFURA_API_KEY = undefined;
const START_BLOCK = 4230000;
const END_BLOCK = 5130433;

const provider = new ethers.providers.InfuraProvider("goerli", INFURA_API_KEY);

interface Payout {
  beneficiary: string;
  totalPayout: BigNumber;
  recipient: string;
}

interface Event {
  args: Payout;
}

/**
 * Retrieve all ChequeCashed events for a given chequebook contract
 *
 * @param chequebookAddress Address of the chequebook contract
 * @returns Array of ChequeCashed events with just beneficiary and totalPayout values
 */
const getChequbookEventsData = async (
  chequebookAddress: string
): Promise<Payout[]> => {
  const chequebookContract = ERC20SimpleSwap__factory.connect(
    chequebookAddress,
    provider
  );

  let events: Event[] = [];

  let processedBlock = START_BLOCK;
  let step = END_BLOCK - START_BLOCK;

  do {
    try {
      const nextBlock = Math.min(processedBlock + step, END_BLOCK);
      const e = await chequebookContract.queryFilter(
        chequebookContract.filters.ChequeCashed(
          null,
          null,
          null,
          null,
          null,
          null
        ),
        processedBlock,
        nextBlock
      );
      events.push(...e);
      processedBlock = nextBlock;
    } catch (_e) {
      step = Math.floor(step / 2);
    }
  } while (processedBlock !== END_BLOCK);

  // Lets reduce this a bit to only beneficiary, amount
  return events
    .map(({ args: { beneficiary, totalPayout, recipient } }) => ({
      beneficiary,
      totalPayout,
      recipient,
    }))
    .filter(({ totalPayout }) => totalPayout.gt("0"));
};

// Retrieve the data from blockchain
const retrieveEventData = async (trustedNodes: string[]) => {
  const eventData = [];
  for (let i = 0; i < trustedNodes.length; ) {
    console.log(
      `retrieving ${trustedNodes[i]}: ${i + 1} / ${trustedNodes.length}`
    );
    try {
      eventData.push(await getChequbookEventsData(trustedNodes[i]));
      i += 1;
    } catch (e) {
      console.log("error, retrying:", e?.message);
    }
  }

  return eventData.flat();
};

/**
 * Go through all the chequbookAddresses, retrieve the ChequeCashed events and merge them per beneficiary address
 */
const main = async () => {
  let eventData = await retrieveEventData(trustedNodes);

  const newTrustedNodesSet = new Set<string>(trustedNodes);
  eventData.forEach((ev) => newTrustedNodesSet.add(ev.recipient));

  const newTrustedNodes: string[] = Array.from(newTrustedNodesSet).sort();

  await fs.writeFileSync(
    "extended_trusted_nodes.json",
    JSON.stringify(newTrustedNodes, null, 2)
  );
};

main();
