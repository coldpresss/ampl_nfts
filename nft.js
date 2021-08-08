  /*
  const owner = beyondHelpers.get('owner', '0x0000000000000000000000000000000000000000');
  (async () => {
    const nft = await beyondHelpers.getMetadata();
    const nftAttributes = nft.properties;
  })();
  */

  /*
    ########################################
    #             Mini doc                 #
    ########################################

    This is where lies the JavaScript.
    Everywhere:
    You can access the tokenURI and the Metadata of the JSON directly from the code

    On BeyondNFT:
    We also pass information like "owner" and "viewer" to the NFT
    And Factories properties when the NFT is from a factory (seed, and editable properties)

    A simple helper is added to the code to help you get access to those data.

    beyondHelpers.getMetadata(): returns a promise and fetches the NFT's json containing all Metadata
    beyondHelpers.get('owner'): return the current NFT owner address (if unknown it will be 0x0000000...)

    For factories:
    - beyondHelpers.get('seed')
    - beyondHelpers.get('propertyName')

    So you can do things like:
    (async () => {
      const nft = await beyondHelpers.getMetadata();

      // access the name of the NFT
      const name = nft.name;

      // access the image of the NFT
      const image = nft.image;

      // access the properties of the NFT
      const nftAttributes = nft.properties;
    })();

    ########################################
    #             Factories                #
    ########################################

    If you are developing a factory, you will be able to access the factory data (properties or seed)
    using the getter: beyondHelpers.get(propertyName: string) : string

    examples:

    // with a seed
    const seed = beyondHelpers.get('seed');

    // with editable properties
    const nft = window.context.nft_json;
    const background = beyondHelpers.get('background');
    const speed = beyondHelpers.get('speed');
    const range = beyondHelpers.get('range');

    ########################################
    #               Assets                 #
    ########################################

    If you are using images, videos, audio, please consider uploading those assets
    to IPFS and pin it before referencing it in your code (e.g using https://pinata.cloud)

    ########################################
    #             /!\ Warning             #
    ########################################

    To protect viewers, insecure operation like access to cookies, localStorage, eval, alert or to plugins are not possible.
    This might change in the future with a Permission system.

    ########################################
    #                 p5js                 #
    ########################################

    Be aware that if you add p5.js as a dependency, you MUST use the minified version,
    the non minified version tries to access cookies and will create an error / not render.

    ########################################
    #              Have fun!               #
    ########################################

    Please be responsible, enjoy the coding and feel free to come ask anything on Discord: "http://chat.beyondnft.io"
  */

// Color logo background based on
// positive or negative rebase: green or red
// percentage difference from all time prices: alpha
// const allTimeHigh = 4.07 // from CoinGecko
const allTimeHigh = 2 // a lower all time high
const allTimeLow = 0.155869 // from CoinGecko

function colorLogo(marketRateAtRebase, targetRateAtRebase) {
  const diffRateAtRebase = marketRateAtRebase - targetRateAtRebase

  let hue
  let allTimeRate
  if (diffRateAtRebase >= 0) {
    // green
    hue = 120
    allTimeRate = allTimeHigh
  } else {
    // red
    hue = 0
    allTimeRate = allTimeLow
  }
  let alpha = diffRateAtRebase / (allTimeRate - targetRateAtRebase)

  let color = `hsla(${hue}, 100%, 50%, ${alpha})`
  console.log(diffRateAtRebase, color)
  document.getElementById("header_logo").style.backgroundColor = color
}

document.getElementById("price_slider").addEventListener("input", e => {
  const marketRate = 1 + (e.target.value / 100)
  document.getElementById("price_slider_output").value = marketRate
  colorLogo(marketRate, 1.0509486087580322)
})
                                                         
fetch("https://web-api.ampleforth.org/eth/token-info").then(async response => {
  const json = await response.json()

  // API provides rates for the last rebase
  colorLogo(json.lastRebaseInfo.marketRateAtRebase, json.lastRebaseInfo.targetRateAtRebase)
})
