setValueOnInput = (name, value) ->
  inputs = document.querySelectorAll("form#options *[name='#{name}']")
  input = inputs[0]

  return unless input

  if input.tagName == 'INPUT'
    if input.type == 'checkbox'
      input.checked = true if value
    else if input.type == 'radio'
      Array.prototype.slice.call(inputs,0).some (radio) ->
        if radio.value == value
          radio.checked = true if value
          true
    else
      input.value = value
  else if input.tagName == 'SELECT'
    for option in input.options
      option.selected = true if option.value == value
  else if input.tagName = 'TEXTAREA'
    input.value = value

getOptionValuesFromForm = ->
  inputs = document.querySelectorAll("form#options *[name]")
  values = {}
  for input in inputs
    name = input.name

    if input.tagName == 'INPUT'
      if input.type == 'checkbox'
        values[name] = (input.value || "checked") if input.checked
      else if input.type == 'radio'
        if Object.keys(values).indexOf input.name > -1
          radios = document.querySelectorAll("form#options input[type='radio'][name='#{name}']")
          for radio in radios
            values[name] = radio.value if radio.checked
      else
        values[name] = input.value
    else if input.tagName == 'SELECT'
      for option in input.options
        values[name] = option.value if option.selected
    else if input.tagName = 'TEXTAREA'
      input.value = value
  values

###
Load the options from the backend and load them in to the form
###
optionStore.get (options) ->
  Object.keys(options).forEach (name) ->
    setValueOnInput(name, options[name])

###
Take the values from the form and save them to the data store
###
document.getElementById('saveSettings').addEventListener 'click', (event) ->
  optionStore.setAll getOptionValuesFromForm()
  event.preventDefault()
, false