import { resolve } from "path";
import { writeFile, appendFile } from "fs/promises";

const iconsPath = resolve(process.cwd(), "./packages/theme/icons");
const iconsIndexPath = resolve(iconsPath, "index.css");
const iconsDictionaryPath = resolve(iconsPath, "dictionary.json");

const iconSourceMap = {
  transformations:
    "https://cdn.boxicons.com/3.0.3/fonts/transformations.min.css",

  animations: "https://cdn.boxicons.com/3.0.4/fonts/animations.min.css",

  "basic-regular-200":
    "https://pro.boxicons.com/fonts/3.0.6/basic/regular/200/boxicons.min.css?sig=1c9f594a9bbfdc86b6480b6b516683eb1dcebede1fce891f138e48aff733bc09",
  "basic-regular-400":
    "https://pro.boxicons.com/fonts/3.0.6/basic/regular/400/boxicons.min.css?sig=0cce49ce1431a35cb432c77b600bab256edc509eccee41bf823a192bcd8a74d3",
  "basic-regular-600":
    "https://pro.boxicons.com/fonts/3.0.6/basic/regular/700/boxicons.min.css?sig=9c0387f720bac3017efb96568d7248a2df0f709df8b19aa973c02767511d2417",

  "basic-rounded-200":
    "https://pro.boxicons.com/fonts/3.0.6/basic/rounded/200/boxicons-rounded.min.css?sig=73c5fb7c08a16efed3eba62816cb3078188bfac6836126ba5d2657693a9475d9",
  "basic-rounded-400":
    "https://pro.boxicons.com/fonts/3.0.6/basic/rounded/400/boxicons-rounded.min.css?sig=85e01aae68939890861d85ff9cd8ff21c5f016fda00445f63e32604966b05b6e",
  "basic-rounded-600":
    "https://pro.boxicons.com/fonts/3.0.6/basic/rounded/700/boxicons-rounded.min.css?sig=79c6c9ed7b7ff6e9d63b65d1277041c80c24dac8a7fae10406208a23b3c88227",

  "basic-sharp-200":
    "https://pro.boxicons.com/fonts/3.0.6/basic/sharp/200/boxicons-sharp.min.css?sig=2822a1bb93ca492884a55e05d57cf5e2792b5b4cc7734e6b435de3527b823b72",
  "basic-sharp-400":
    "https://pro.boxicons.com/fonts/3.0.6/basic/sharp/400/boxicons-sharp.min.css?sig=6d2567a0bb7cd0fc9f8f04b7cf12f30cdc50fb9d8350fa845165248c04e06093",
  "basic-sharp-600":
    "https://pro.boxicons.com/fonts/3.0.6/basic/sharp/700/boxicons-sharp.min.css?sig=30c5453109ec637df0db88a2c7193e5f94991789410f22b22fd276d0e80b67a6",

  "duo-regular-200":
    "https://pro.boxicons.com/fonts/3.0.6/duotone/regular/200/boxicons-duotone.min.css?sig=ff69b4f0731a31cb150786095218eab49b5fa67d18f8fdcb213281695b06d1e7",
  "duo-regular-400":
    "https://pro.boxicons.com/fonts/3.0.6/duotone/regular/400/boxicons-duotone.min.css?sig=ba90d94b3ccf5555e8840528fb92a7a3183b0f2020ebc9535f6d053d32f02664",
  "duo-regular-600":
    "https://pro.boxicons.com/fonts/3.0.6/duotone/regular/700/boxicons-duotone.min.css?sig=c704bcee726d43c7fd09a73db48cdb0442051252a5f51455b4651b648603794a",

  "duo-rounded-200":
    "https://pro.boxicons.com/fonts/3.0.6/duotone/rounded/200/boxicons-rounded-duotone.min.css?sig=a29061f0e83f7c9e88613bf29933910b6f536c3b42978c2b47f2e306755246ba",
  "duo-rounded-400":
    "https://pro.boxicons.com/fonts/3.0.6/duotone/rounded/400/boxicons-rounded-duotone.min.css?sig=c74c0426f07b3f7b56f7560b41a77ae484c3bf1fcf0fb48b8dbc96e83f85b5b2",
  "duo-rounded-600":
    "https://pro.boxicons.com/fonts/3.0.6/duotone/sharp/700/boxicons-sharp-duotone.min.css?sig=f3fa715201e2d1c5deb908ea61f9b67816488453c8a29c820bd2272b56e382af",

  "duo-sharp-200":
    "https://pro.boxicons.com/fonts/3.0.6/duotone/sharp/200/boxicons-sharp-duotone.min.css?sig=d005ceb4aa759012b41bbc16c245a8985d14dabb001e341fc29e50f3b4d53995",
  "duo-sharp-400":
    "https://pro.boxicons.com/fonts/3.0.6/duotone/sharp/400/boxicons-sharp-duotone.min.css?sig=6f2b14b1f57148c383cfbf710e8e95174873c27902800b52271e9f0c643906a4",
  "duo-sharp-600":
    "https://pro.boxicons.com/fonts/3.0.6/duotone/sharp/700/boxicons-sharp-duotone.min.css?sig=f3fa715201e2d1c5deb908ea61f9b67816488453c8a29c820bd2272b56e382af",

  "duosolid-regular-200":
    "https://pro.boxicons.com/fonts/3.0.6/duotone-solid/regular/200/boxicons-duotone-solid.min.css?sig=f5f10156289840a32bb60344dd4a765d04efdac0febca54166164abec3d43c02",
  "duosolid-regular-400":
    "https://pro.boxicons.com/fonts/3.0.6/duotone-solid/regular/400/boxicons-duotone-solid.min.css?sig=d9090bcb15f84c8d7466830121379df2ad28ac8073fee1bf7d2b2f9662497080",
  "duosolid-regular-600":
    "https://pro.boxicons.com/fonts/3.0.6/duotone-solid/regular/700/boxicons-duotone-solid.min.css?sig=2599dfb3617ec8d1e46794b21f5fd7ef77d171d5e525e88a768bd3288b26876b",

  "duosolid-rounded-200":
    "https://pro.boxicons.com/fonts/3.0.6/duotone-solid/rounded/200/boxicons-rounded-duotone-solid.min.css?sig=1266df255777513e3bbad20de9e6b29f0bfb06d7aac44d35d55518262ba35fac",
  "duosolid-rounded-400":
    "https://pro.boxicons.com/fonts/3.0.6/duotone-solid/rounded/400/boxicons-rounded-duotone-solid.min.css?sig=def074fee529a9b3861fb95ed0cd80cecdf4ed6dee4469ecf32be568e686f10c",
  "duosolid-rounded-600":
    "https://pro.boxicons.com/fonts/3.0.6/duotone-solid/rounded/700/boxicons-rounded-duotone-solid.min.css?sig=ee368dbab63a83876e627c239a3def4c9b78489fdaa04c9b3a915429d811d2b9",

  "duosolid-sharp-200":
    "https://pro.boxicons.com/fonts/3.0.6/duotone-solid/sharp/200/boxicons-sharp-duotone-solid.min.css?sig=98141d0a564df13353a062ecc2405c894ebcc748cdf8c09a6e0a8d246d9f3a42",
  "duosolid-sharp-400":
    "https://pro.boxicons.com/fonts/3.0.6/duotone-solid/sharp/400/boxicons-sharp-duotone-solid.min.css?sig=aaff5cab313f4bae0df5e1335983914bac9b036eb90f4430aeca63be2737e73a",
  "duosolid-sharp-600":
    "https://pro.boxicons.com/fonts/3.0.6/duotone-solid/sharp/700/boxicons-sharp-duotone-solid.min.css?sig=13c69f1060f2e4dac21ef6c824393fc3318bf3fdd46a068716a6a6c36a7fe276",

  "brands-regular":
    "https://cdn.boxicons.com/3.0.6/fonts/brands/boxicons-brands.min.css",
};

const dictionary = {};

function extractIconNames(iconContent) {
  const iconNames = new Set();

  // Match both regular icons (.bx-icon-name:before) and brand icons (.bxl.bx-icon-name:before)
  const regex = /\.(?:bxl\.)?bx-([\w-]+):before/g;
  let match;

  while ((match = regex.exec(iconContent)) !== null) {
    iconNames.add(match[1]);
  }

  return Array.from(iconNames);
}

function fixIconCSSSelectors(iconContent, key) {
  // Skip non-icon sets
  if (key === "transformations" || key === "animations") {
    return iconContent;
  }

  // Map each icon set to its specific prefix class
  const prefixMap = {
    "basic-regular-200": "bx",
    "basic-regular-400": "bx",
    "basic-regular-600": "bx",
    "basic-rounded-200": "bxr",
    "basic-rounded-400": "bxr",
    "basic-rounded-600": "bxr",
    "basic-sharp-200": "bxs",
    "basic-sharp-400": "bxs",
    "basic-sharp-600": "bxs",
    "duo-regular-200": "bxd",
    "duo-regular-400": "bxd",
    "duo-regular-600": "bxd",
    "duo-rounded-200": "bxr",
    "duo-rounded-400": "bxr",
    "duo-rounded-600": "bxr",
    "duo-sharp-200": "bxs",
    "duo-sharp-400": "bxs",
    "duo-sharp-600": "bxs",
    "duosolid-regular-200": "bxs",
    "duosolid-regular-400": "bxs",
    "duosolid-regular-600": "bxs",
    "duosolid-rounded-200": "bxr",
    "duosolid-rounded-400": "bxr",
    "duosolid-rounded-600": "bxr",
    "duosolid-sharp-200": "bxs",
    "duosolid-sharp-400": "bxs",
    "duosolid-sharp-600": "bxs",
    "brands-regular": "bxl",
  };

  const prefix = prefixMap[key];
  if (!prefix) {
    console.debug("No prefix found for icon set", key);
    return iconContent;
  }

  // Replace the overly broad selector [class^="bx"],[class*=" bx"],.prefix
  // with just the specific prefix class selector to avoid conflicts
  // Pattern matches: [class^="bx"],\n[class*=" bx"],\n.prefix{...} -> .prefix{...}
  // Handles both minified (no newlines) and formatted (with newlines) CSS
  const broadSelectorPattern =
    /\[class\^="bx"\],\s*\[class\*=" bx"\],\s*\.([a-z]+)\{/g;

  // icon content sometimes has a weird "v1 display:" selector that we need to remove
  // Use global regex to replace all occurrences and handle whitespace variations
  iconContent = iconContent.replace(/v1\s+display:/g, "display:");

  // Brands icons point to a relative path that doesn't exist, so replace the relative path with the domain url
  // Replace any occurrence of 'url(./boxicons-brands' with the full CDN URL using regex
  if (key === "brands-regular") {
    iconContent = iconContent.replace(
      /url\(\.\/boxicons-brands/gi,
      "url(https://cdn.boxicons.com/3.0.6/fonts/brands/boxicons-brands"
    );
  }

  return iconContent.replace(broadSelectorPattern, (match, selectorPrefix) => {
    // Only replace if it matches the expected prefix for this file
    if (selectorPrefix === prefix) {
      return `.${prefix}{`;
    }
    // If it doesn't match, remove the broad selectors but keep the specific one
    return `.${selectorPrefix}{`;
  });
}

function parseStyleWeightKey(key) {
  // Handle brands-regular specially
  if (key === "brands-regular") {
    return { pack: "brands", style: "regular", weight: "regular" };
  }

  // Parse format: pack-style-weight (e.g., "basic-regular-200")
  const parts = key.split("-") || [];
  if (parts.length < 3) return null;

  const [pack = "basic", style = "regular", weightNum = "200"] = parts;

  const weightMap = { 200: "thin", 400: "normal", 600: "bold" };

  return { pack, style, weight: weightMap[weightNum] ?? weightNum };
}

function transformDictionary(rawDictionary) {
  const transformed = {};

  const weightOrder = { thin: 1, normal: 2, regular: 3, bold: 4 };

  const sortWeights = (weights) =>
    weights.sort((a, b) => {
      const orderA = weightOrder[a] || 999;
      const orderB = weightOrder[b] || 999;
      return orderA - orderB;
    });

  for (const [iconName, styleWeightKeys] of Object.entries(rawDictionary)) {
    const packs = new Set();
    const styles = new Set();
    const weights = new Set();

    for (const key of styleWeightKeys) {
      const parsed = parseStyleWeightKey(key);
      if (!parsed) continue;

      packs.add(parsed.pack);
      styles.add(parsed.style);
      weights.add(parsed.weight);
    }

    transformed[iconName] = {
      packs: Array.from(packs).sort(),
      styles: Array.from(styles).sort(),
      weights: sortWeights(Array.from(weights)),
    };
  }

  return transformed;
}

const iconFilePath = (key) => resolve(iconsPath, `${key}.min.css`);
const iconImportLine = (key) => `@import "./${key}.min.css";\n`;

async function main() {
  await writeFile(iconsIndexPath, "");

  for (const [key, value] of Object.entries(iconSourceMap)) {
    const iconContent = await fetch(value)
      .then((res) => res.text())
      .catch(() => null);

    if (!iconContent) {
      console.error(`❌ Failed to fetch icon set '${key}'`);
      continue;
    }

    // Fix CSS selectors to avoid conflicts between icon sets
    const fixedContent = fixIconCSSSelectors(iconContent, key);

    let iconNames = [];
    if (!["transformations", "animations"].includes(key)) {
      iconNames = extractIconNames(fixedContent);

      // Add each icon to the dictionary with its available style/weight
      for (const iconName of iconNames) {
        if (!dictionary[iconName]) {
          dictionary[iconName] = [];
        }
        dictionary[iconName].push(key);
      }
    }

    await writeFile(iconFilePath(key), fixedContent)
      .then(() => appendFile(iconsIndexPath, iconImportLine(key)))
      .catch(() => console.error(`❌ Failed to write icon set '${key}'`))
      .finally(() => {
        console.log(
          `✅ Imported icon set '${key}'`,
          iconNames.length > 0 ? `(${iconNames.length} icons)` : ""
        );
      });
  }

  // Sort dictionary keys and arrays for consistent output
  const sortedDictionary = Object.keys(dictionary)
    .sort()
    .reduce((acc, key) => {
      acc[key] = dictionary[key].sort();
      return acc;
    }, {});

  // Transform dictionary to structured format
  const transformedDictionary = transformDictionary(sortedDictionary);

  // Sort transformed dictionary keys for consistent output
  const finalDictionary = Object.keys(transformedDictionary)
    .sort()
    .reduce((acc, key) => {
      acc[key] = transformedDictionary[key];
      return acc;
    }, {});

  // Write dictionary to JSON file
  await writeFile(
    iconsDictionaryPath,
    JSON.stringify(finalDictionary, null, 2)
  );

  console.log(
    `\n✅ Created icon dictionary with ${
      Object.keys(finalDictionary).length
    } unique icons`
  );
}

main();
