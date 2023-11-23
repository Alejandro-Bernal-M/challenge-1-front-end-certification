let quotesData;
var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

function getQuotes(){
  return jQuery.get(
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    (data) => {
      quotesData =  JSON.parse(data).quotes;
    }
  )
};

function getRandomQuote(array){
  const randomPosition = Math.floor(Math.random() * array.length);
  return array[randomPosition];
};

function setRandomQuote(){
  let randomQuote;
  randomQuote = getRandomQuote(quotesData)
  $('#quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').html(randomQuote.quote);
  });

  $('#quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?&text=' +
      encodeURIComponent('"' + randomQuote.quote + '" ' +'-'   + randomQuote.author)
  );

  let color = Math.floor(Math.random() * colors.length);
  console.log(colors[color])

  $('body').css({
    'transition': 'background-color 1s, color 1s',
    'background-color': colors[color],
  });
  
  $('.button').css({
    'transition': 'background-color 1s, color 1s',
    'background-color': colors[color],
  })
  
  $('.fa-solid').css({
    'transition': 'color 1s',
    'color': colors[color],
  })
};

$('#new-quote').click(setRandomQuote)

$(document).ready(()=> {
  console.log('connected')
  getQuotes().then(()=> {
    setRandomQuote();
  });
})