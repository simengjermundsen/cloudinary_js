/**
 *
 * @description - Given a string URL, this function will load the script and resolve the promise.
 *                The function doesn't resolve any value,
 *                this is not a UMD loader where you can get your library name back.
 * @param scriptURL {string}
 * @param maxTimeout {number} max wait time before timeout
 * @param loadCondition {boolean} if true, the loadScript resolves immediately
 *                                this is used for multiple invocations - prevents the script from being loaded multiple times
 * @return {Promise<>}
 */
function loadScript(scriptURL,maxTimeout, loadCondition) {
  return new Promise((resolve, reject) => {
    if (loadCondition) {
      resolve();
    } else {
      let scriptTag = document.createElement('script');
      scriptTag.src = scriptURL;

      let timerID = setTimeout(() => {
        reject({
          status: 'error',
          message: `Timeout loading script ${scriptURL}`
        });
      }, maxTimeout); // 10 seconds for timeout

      scriptTag.onerror = () => {
        clearTimeout(timerID); // clear timeout reject error
        reject({
          status: 'error',
          message: `Error loading ${scriptURL}`
        });
      };

      scriptTag.onload = () => {
        clearTimeout(timerID); // clear timeout reject error
        resolve();
      };
      document.head.appendChild(scriptTag);
    }
  });
}

export default loadScript;
