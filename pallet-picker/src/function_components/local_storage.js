import palletData from "../default-pallet.json"

// Generic Helper Functions
export const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
  
  export const getLocalStorageKey = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  
  // pallet-specific helper functions
  export const setPallets = (pallets) => setLocalStorageKey('pallets', pallets);
  export const getPallets = () => getLocalStorageKey('pallets');
  
  // modifying pallet functions
  export const initializePallets = () => setPallets(palletData);
  
  export const addPallets = (pallet) => {
    const pallets = getPallets();
    setPallets([pallet, ...pallets]);
  }
  
  export const removePallet = (palletToRemove) => {
    const pallets = getPallets();
    const filteredPallet = pallets.filter((pallet) => pallet.uuid !== palletToRemove.uuid);
    setPallets(filteredPallet);
  }