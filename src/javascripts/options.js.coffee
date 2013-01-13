class OptionStore
  get: (key, callback) ->
    callback = key if typeof(key) == 'function'

    if !key or key == callback
      chrome.extension.sendRequest {method: "options.getAll"}, (@options) =>
        @optionsLoaded = true
        callback(options) if callback
    else if @optionsLoaded
      callback @options[key]
    else
      @get =>
        callback(@options[key])

  setAll: (options) ->
    chrome.extension.sendRequest {
      method: "options.setAll",
      options: options
    }

  set: (key, value) ->
    if typeof(key) == 'object'
      attrs = key
    else
      attrs = {}
      attrs[key] = value

    chrome.extension.sendRequest {
      method: "options.setMany",
      options: attrs
    }

this.optionStore = new OptionStore