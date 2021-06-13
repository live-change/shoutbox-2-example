const txtgen = require('txtgen')

Feature('shoutbox')

Scenario('post message', ({ I }) => {
  
  session('tom')
  session('john')

  const tomRandomSentence = txtgen.sentence()
  const johnRandomSentence = txtgen.sentence()

  session('tom', () => {
    I.amOnPage('/')
    I.see('Shoutbox')
    I.fillField('input[type=text]', tomRandomSentence)
    I.click('Send')
    I.see(tomRandomSentence)
    I.videoWait(2)
  })

  session('john', () => {
    I.amOnPage('/')
    I.see('Shoutbox')
    I.see(tomRandomSentence)
    I.fillField('input[type=text]', johnRandomSentence)
    I.click('Send')
    I.see(johnRandomSentence)
    I.videoWait(2)
  })

  session('tom', () => {
    I.see(johnRandomSentence)
  })

})


// Scenario('post another message', ({ I }) => {
  
//   session('tom')
//   session('john')

//   const tomRandomSentence = txtgen.sentence()
//   const johnRandomSentence = txtgen.sentence()

//   session('tom', () => {
//     I.amOnPage('/')
//     I.see('Shoutbox')  
//     I.fillField('input[type=text]', tomRandomSentence)
//     I.click('Send')
//     I.see(tomRandomSentence)
//   })

//   session('john', () => {
//     I.amOnPage('/')
//     I.see('Shoutbox')
//     I.see(tomRandomSentence)
//     I.fillField('input[type=text]', johnRandomSentence)
//     I.click('Send')
//     I.see(johnRandomSentence)
//   })

//   session('tom', () => {
//     I.see(johnRandomSentence)
//   })

// })