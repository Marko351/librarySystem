(function(){

  const libraryStorage = {};

  function librarySystem(libraryName, dependencyArray, callback){
    if(arguments.length > 1){
      libraryStorage[libraryName] = {
        dependencies: dependencyArray,
        callback: callback,
        isLoaded: false,
        result: null
      }
    }else{
      return loadLibrary(libraryName);
    }
  }

  function loadLibrary(libraryName){
    const library = libraryStorage[libraryName];
    let dependencyArr = [];

    if(library.isLoaded){
      return library.result;
    }

    if(library.dependencies.length){
      dependencyArr = library.dependencies.map(function(dependency){
        return loadLibrary(dependency);
      })
    }

    let result = library.callback.apply(null, dependencyArr);
    library.isLoaded = true;
    library.result = result;
    return result;

  }

  window.librarySystem = librarySystem;
})()