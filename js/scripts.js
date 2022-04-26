const button_send = document.getElementById('send');
button_send.addEventListener('click', function(event) {
  var form = document.forms[0];
  var input_elemens = form.elements.input;
  document.getElementById('send').disabled = true;
  let alternate_url = document.getElementById('alternate_url');
  alternate_url.innerHTML = "";
  var text_from_inputs = [];
  for (var i = 0; i < input_elemens.length; i++) {
    var current_value = input_elemens[i].value;
    if (current_value.length > 0) {
      text_from_inputs.push(current_value)
    } else {
      continue
    };
  };
  let area_id = document.getElementById('areas').value;
  a(text_from_inputs, area_id);
  show_alternative_url();
});
var data_map = new Map();
async function a(text_from_inputs, area_id) {
  for (let value of text_from_inputs) {
    var correct_value = encodeURIComponent(value);
    let response = await fetch(`https://api.hh.ru/vacancies/?area=${area_id}&text=${correct_value}`);
    let data = await response.json();
    data_found = data['found'];
    data_map.set(value, data_found);
    show_alternative_url(value, data['alternate_url']);
  };
  var text_founds = [];
  for (var keys of data_map.keys()) {
    text_founds.push(keys);
  };
  var founds = [];
  for (var value of data_map.values()) {
    founds.push(value);
  };
  var sel_areas = document.getElementById("areas");
  var text_areas = sel_areas.options[sel_areas.selectedIndex].text;
  chart.updateOptions({
    series: [{
      name: text_areas,
      data: founds
    }],
    xaxis: {
      categories: text_founds
    },
    title: {
      text: text_areas,
      align: 'center',
      floating: true,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#263238'
      },
    },
  }, true, true, true);
  data_map.clear();
  document.getElementById('send').disabled = false;
};
const button_clear = document.getElementById('clear');
button_clear.addEventListener('click', function(event) {
  document.forms[0].reset();
});
function show_alternative_url(val, a_url) {
  if (val !== undefined) {
    let alternate_url = document.getElementById('alternate_url');
    alternate_url.innerHTML += `<a href="${a_url}" target="_blank" class="badge bg-dark">${val}</a>`
  }
}
var options = {
  series: [{
    name: "wezochy.ru",
    data: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
  }],
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
      dataLabels: {
        position: 'top',
      },
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ['black']
    },
    offsetX: -5,
  },
  xaxis: {
    categories: ['1', '2', '3', '4', '5', '6', '7',
      '8', '9', '10'
    ],
  },
  fill: {
    colors: ['#9D9D9D']
  },
  title: {
    text: '',
    align: 'center',
    floating: true,
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      color: '#263238'
    },
  },
};
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
