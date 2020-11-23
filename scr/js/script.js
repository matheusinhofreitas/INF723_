$(document).ready(function(){
    //variaveis grafico 1 - mapa dos clientes.
    //cores deposito + tarefas 
    var id = 0;
    
    for(var i = 0; i < instancias.length; i++){
      var nome = sprintf(instancias[i].nome);
      $("#instancia").append(new Option(nome, i ));

    }
    $('#instancia option').addClass('form-control');

    $( "#instancia" ).change(function() {
      id = $("#instancia").val();
     $('#titulo').text(instancias[id].nome);

      atualiza_tabela(id);
      monta_graficos(id);
    });
      
    $('.fixed-plugin a').click(function(event) {
     if ($(".dropdown-menu").hasClass('show')) {
        $(".dropdown-menu").removeClass('show');
        $(".dropdown-menu").css({opacity:0});
      }
      else{
        $(".dropdown-menu").addClass('show');
        $(".dropdown-menu").css({opacity:1});
      }
    });
    
    $("#grande").click(function(){
      $(".aumentar .coluna").removeClass('col-lg-6');
      $(".aumentar .coluna").removeClass('col-md-6');
      $(".aumentar .coluna").removeClass('col-sm-6');

      $(".aumentar .coluna").addClass('col-lg-12');
      $(".aumentar .coluna").addClass('col-md-12');
      $(".aumentar .coluna").addClass('col-sm-12');
      monta_graficos(id);
    });
    $("#medio").click(function(){
      $(".aumentar .coluna").addClass('col-lg-6');
      $(".aumentar .coluna").addClass('col-md-6');
      $(".aumentar .coluna").addClass('col-sm-6');

      $(".aumentar .coluna").removeClass('col-lg-12');
      $(".aumentar .coluna").removeClass('col-md-12');
      $(".aumentar .coluna").removeClass('col-sm-12');
      monta_graficos(id);
    });
    
    var ord_0 = 0;
    $(".veiculos_i").click(function(){
      if(ord_0 == 0){
        ord_0 = 1;
        grafico_capacidade_veiculos(instancias, id, ord_0);
      }
      else{
        ord_0 = 0;
        grafico_capacidade_veiculos(instancias, id, ord_0);
      }
    });

    var ord_1 = 0;
    $(".datas_entrega_i").click(function(){
      console.log(ord_1);
      if(ord_1 == 0){
        ord_1 = 1;
        grafico_datas_entregas(instancias, id, ord_1);
      }
      else{
        ord_1 = 0;
        grafico_datas_entregas(instancias, id, ord_1);
      }
      console.log(ord_1);

    });
    
    var ord_2 = 0;
    $(".demandas_i").click(function(){
      if(ord_2 == 0){
        ord_2 = 1;
        grafico_demanda_clientes(instancias, id, ord_2);
      }
      else{
        ord_2 = 0;
        grafico_demanda_clientes(instancias, id, ord_2);
      }
    });

     var ord_3 = 0;
    $(".atraso_s").click(function(){
      if(ord_3 == 0){
        ord_3 = 1;
        grafico_atraso_tarefas(instancias, id, ord_3);
      }
      else{
        ord_3 = 0;
        grafico_atraso_tarefas(instancias, id, ord_3);
      }
    });
    
    var ord_4 = 0;
    $(".completion_Time_s").click(function(){
      if(ord_4 == 0){
        ord_4 = 1;
        grafico_completion_time(instancias, id, ord_4);
      }
      else{
        ord_4 = 0;
        grafico_completion_time(instancias, id, ord_4);
      }
    });
    
    $("#result").click(function () {
      $(".result").toggle(800);
    });
    $("#inst").click(function () {
      $(".inst").toggle(800);
    });
      
  
    atualiza_tabela(id);
    monta_graficos(id);
});
function atualiza_tabela(id){

  $('#fo').text(instancias[id].funcao_objetivo);
  var obj1 = instancias[id].obj1/instancias[id].funcao_objetivo*100;
  $('#obj1').text(instancias[id].obj1 +" - "+ obj1.toFixed(2)+"%");
  var obj2 = instancias[id].obj2/instancias[id].funcao_objetivo*100;
  $('#obj2').text(instancias[id].obj2 +" - "+ obj2.toFixed(2)+"%");
  var obj3 = instancias[id].obj3/instancias[id].funcao_objetivo*100;
  $('#obj3').text(instancias[id].obj3 +" - "+ obj3.toFixed(2)+"%");
  $('#gap2').text(instancias[id].gap.toFixed(3));
  var porc = instancias[id].gap * 100;
  $('#gap1').text(porc.toFixed(2)+"%");
  $('#tempo').text(instancias[id].tempo_execucao);
  $('#maquinas').text(instancias[id].n_maquinas); 
  $('#tarefas').text(instancias[id].n_tarefas);
  $('#veiculos').text(instancias[id].n_veiculos);
  $('#capacidade_t').text(instancias[id].capacidade_Total); 
  $('#demanda_t').text(instancias[id].demanda_Total);    
  $('#pf').text(instancias[id].priority_factor);    
  $('#rf').text(instancias[id].range_factor);    
  $('#raio').text(instancias[id].raio);    
  $('#circulo').text(instancias[id].circulos);   
  $('#setup').text(instancias[id].setup_min+"-"+instancias[id].setup_max);    
  $('#tp').text(instancias[id].TP_min+"-"+instancias[id].TP_max);    
  $('#demanda').text(instancias[id].demanda_min + "-"+ instancias[id].demanda_max);   
}

function monta_graficos(id){

  grafico_localizacao(instancias, id);
  grafico_tp_por_maquina(instancias, id);
  grafico_capacidade_veiculos(instancias, id);
  grafico_datas_entregas(instancias, id);
  grafico_demanda_clientes(instancias, id);
  grafico_planejamento(instancias, id);
  grafico_atraso_tarefas(instancias, id);
  grafico_rotas(instancias, id);
  grafico_objetivos(instancias, id);
  grafico_completion_time(instancias, id);
  


}

function graficos_solucao(){
  
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function (err, data) {
  // Create a lookup table to sort and regroup the columns of data,
  // first by year, then by continent:
  var lookup = {};
  function getData(year, continent) {
    var byYear, trace;
    if (!(byYear = lookup[year])) {;
      byYear = lookup[year] = {};
    }
	 // If a container for this year + continent doesn't exist yet,
	 // then create one:
    if (!(trace = byYear[continent])) {
      trace = byYear[continent] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }

  // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.year, datum.continent);
    trace.text.push(datum.country);
    trace.id.push(datum.country);
    trace.x.push(datum.lifeExp);
    trace.y.push(datum.gdpPercap);
    trace.marker.size.push(datum.pop);
  }

  // Get the group names:
  var years = Object.keys(lookup);
  // In this case, every year includes every continent, so we
  // can just infer the continents from the *first* year:
  var firstYear = lookup[years[0]];
  var continents = Object.keys(firstYear);

  // Create the main traces, one for each continent:
  var traces = [];
  for (i = 0; i < continents.length; i++) {
    var data = firstYear[continents[i]];
	 // One small note. We're creating a single trace here, to which
	 // the frames will pass data for the different years. It's
	 // subtle, but to avoid data reference problems, we'll slice
	 // the arrays to ensure we never write any new data into our
	 // lookup table:
    traces.push({
      name: continents[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        sizeref: 200000
      }
    });
  }

  // Create a frame for each year. Frames are effectively just
  // traces, except they don't need to contain the *full* trace
  // definition (for example, appearance). The frames just need
  // the parts the traces that change (here, the data).
  var frames = [];
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: continents.map(function (continent) {
        return getData(years[i], continent);
      })
    })
  }
  console.log(frames[0]);
  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
  var sliderSteps = [];
  for (i = 0; i < years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: years[i],
      args: [[years[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

  var layout = {
    xaxis: {
      title: 'Life Expectancy',
      range: [30, 85]
    },
    yaxis: {
      title: 'GDP per Capita',
      type: 'log'
    },
    hovermode: 'closest',
	 // We'll use updatemenus (whose functionality includes menus as
	 // well as buttons) to create a play button and a pause button.
	 // The play button works by passing `null`, which indicates that
	 // Plotly should animate all frames. The pause button works by
	 // passing `[null]`, which indicates we'd like to interrupt any
	 // currently running animations with a new list of frames. Here
	 // The new list of frames is empty, so it halts the animation.
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 300},
          frame: {duration: 500, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],
	 // Finally, add the slider and use `pad` to position it
	 // nicely next to the buttons.
    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]
  };

  // Create the plot:
  //Plotly.newPlot('myDiv', {
 //   data: traces,
//    layout: layout,
//    frames: frames,
//  });
});


}


function rota_animada(){
    var pontos = {
      x: [0, 25, 29, 10, -9, -26, -28, -28, -8, 7, 29],
      y: [0, 0, 21, 30, 29, 19, 0, -20, -27, -23, -21],
      text: ['T0<br>C.Time: 0 Dem: 0<br>DtEntre: 0 Atraso:0', 'T1<br>C.Time: 149 Dem: 12<br>DtEntre: 88 Atraso:86', 'T2<br>C.Time: 141 Dem: 42<br>DtEntre: 74 Atraso:121', 'T3<br>C.Time: 10 Dem: 29<br>DtEntre: 75 Atraso:5', 'T4<br>C.Time: 49 Dem: 52<br>DtEntre: 89 Atraso:10', 'T5<br>C.Time: 81 Dem: 7<br>DtEntre: 112 Atraso:42', 'T6<br>C.Time: 73 Dem: 55<br>DtEntre: 107 Atraso:28', 'T7<br>C.Time: 23 Dem: 1<br>DtEntre: 110 Atraso:5', 'T8<br>C.Time: 3 Dem: 26<br>DtEntre: 116 Atraso:0', 'T9<br>C.Time: 44 Dem: 15<br>DtEntre: 78 Atraso:23', 'T10<br>C.Time: 36 Dem: 46<br>DtEntre: 68 Atraso:11'],
      mode: "markers",
      name: "Locais",
      marker: {
        color: [
          "rgb(50,1,213)",
          "rgb(23,89,244)",
          "rgb(79,221,74)",
          "rgb(19,251,105)",
          "rgb(153,54,17)",
          "rgb(153,178,107)",
          "rgb(236,130,224)",
          "rgb(254,136,177)",
          "rgb(25,255,89)",
          "rgb(15,230,23)",
          "rgb(134,87,1)",
        ],
        size: ["0", "12", "42", "29", "52", "7", "55", "1", "26", "15", "46"],
      },
      textposition: "top right",
      size: 3,
    };
    var trace1 = {
          type: "scatter",
          mode: "lines + markers",
          name: "AAPL Low",
          x: [0,5],
          y: [0,5],
        };
    var trace2 = {
        type: "scatter",
        mode: "lines + markers",
        name: "AAPL Low",
        x: [0,-5],
        y: [0,-5],
        };
    var data = [pontos,trace1,trace2];

    var rotas0 = {
      x: [0, 29, 7, -8, 0],
      y: [0, -21, -23, -27, 0],
      mode: "lines",
      name: "Rotas",
    };
    var frames = [];
    frames.push(
        {
            name: "T-44",
            data: [
            {
              
          },
          {
            x: [0, 15],
            y: [0, 15],
             mode: "lines",
          },
          {
            x: [0, -15],
            y: [0, -15],
             mode: "lines",
          },
      ],
    });

    frames.push({
      name: "T-79",
      data: [
          {                            
        },
        {
          x: [0, 29],
          y: [0, -21],
           mode: "lines",
        },
        {
            x: [0, -29],
            y: [0, +21],
             mode: "lines",
          },
      ],
    });

    frames.push({
      name: "T-101",
      data: [
        {
            
        },
        {
            x: [0, 29, 7],
            y: [0, -21, -23],
             mode: "lines",
        },
        {
            x: [0, -29, -7],
            y: [0, 21, 23],
             mode: "lines",
          },
          
      ],
    });
    frames.push({
      name: "T-138",
      data: [
        {
      },
        {
          x: [0, 29, 7, -8],
          y: [0, -21, -23, -27],
           mode: "lines",
        },
        {
            x: [0, -29, -7, 8],
            y: [0, 21, 23, 27],
             mode: "lines",
          },
          
      ],
    });

    frames.push({
      name: "T-166",
      data: [
        {
        },
        {
            x: [0, 29, 7, -8, 0],
            y: [0, -21, -23, -27, 0],
             mode: "lines",
          },
          {
            x: [0, -29, -7, 8, 0],
            y: [0, 21, 23, 27, 0],
             mode: "lines",
          },
          
      ],
    }); 
    console.log(frames[0])
    Plotly.newPlot("myDiv", {
      data: data,
      layout: {
        sliders: [
          {
            pad: { t: 30 },
            x: 0.05,
            len: 0.95,
            currentvalue: {
              xanchor: "right",
              prefix: "color: ",
              font: {
                color: "#888",
                size: 20,
              },
            },
            transition: { duration: 500 },
            // By default, animate commands are bound to the most recently animated frame:
            steps: [
              {
                label: "T-44",
                method: "animate",
                args: [
                  ["T-44"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500, easing: 'cubic-in-out' },
                  },
                ],
              },
              {
                label: "T-79",
                method: "animate",
                args: [
                  ["T-79"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500, easing: 'cubic-in-out' },
                  },
                ],
              },
              {
                label: "T-101",
                method: "animate",
                args: [
                  ["T-101"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500, easing: 'cubic-in-out' },
                  },
                ],
              },
              {
                label: "T-138",
                method: "animate",
                args: [
                  ["T-138"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500, easing: 'cubic-in-out' },
                  },
                ],
              },
              {
                label: "T-166",
                method: "animate",
                args: [
                  ["T-166"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500, easing: 'cubic-in-out' },
                    transition: { duration: 500 },
                  },
                ],
              },
            ],
          },
        ],
        updatemenus: [
          {
            type: "buttons",
            showactive: false,
            x: 0.05,
            y: 0,
            xanchor: "right",
            yanchor: "top",
            pad: { t: 60, r: 20 },
            buttons: [
              {
                label: "Play",
                method: "animate",
                args: [
                  null,
                  {
                    fromcurrent: true,
                    frame: { redraw: false, duration: 1000 },
                    transition: { duration: 500 },
                  },
                ],
              },
            ],
          },
        ],
      },
      // The slider itself does not contain any notion of timing, so animating a slider
      // must be accomplished through a sequence of frames. Here we'll change the color
      // and the data of a single trace:
      frames: frames,
    });

}

function rota_animada2(){
    var pontos = {
      x: [0, 25, 29, 10, -9, -26, -28, -28, -8, 7, 29],
      y: [0, 0, 21, 30, 29, 19, 0, -20, -27, -23, -21],
      text: ['T0<br>C.Time: 0 Dem: 0<br>DtEntre: 0 Atraso:0', 'T1<br>C.Time: 149 Dem: 12<br>DtEntre: 88 Atraso:86', 'T2<br>C.Time: 141 Dem: 42<br>DtEntre: 74 Atraso:121', 'T3<br>C.Time: 10 Dem: 29<br>DtEntre: 75 Atraso:5', 'T4<br>C.Time: 49 Dem: 52<br>DtEntre: 89 Atraso:10', 'T5<br>C.Time: 81 Dem: 7<br>DtEntre: 112 Atraso:42', 'T6<br>C.Time: 73 Dem: 55<br>DtEntre: 107 Atraso:28', 'T7<br>C.Time: 23 Dem: 1<br>DtEntre: 110 Atraso:5', 'T8<br>C.Time: 3 Dem: 26<br>DtEntre: 116 Atraso:0', 'T9<br>C.Time: 44 Dem: 15<br>DtEntre: 78 Atraso:23', 'T10<br>C.Time: 36 Dem: 46<br>DtEntre: 68 Atraso:11'],
      mode: "markers",
      name: "Locais",
      marker: {
        color: [
          "rgb(50,1,213)",
          "rgb(23,89,244)",
          "rgb(79,221,74)",
          "rgb(19,251,105)",
          "rgb(153,54,17)",
          "rgb(153,178,107)",
          "rgb(236,130,224)",
          "rgb(254,136,177)",
          "rgb(25,255,89)",
          "rgb(15,230,23)",
          "rgb(134,87,1)",
        ],
        size: ["0", "12", "42", "29", "52", "7", "55", "1", "26", "15", "46"],
      },
      textposition: "top right",
      size: 3,
    };
    var trace1 = {
          type: "scatter",
          mode: "lines + markers",
          name: "AAPL Low",
          x: [0,5],
          y: [0,5],
        };
    var trace2 = {
        type: "scatter",
        mode: "lines + markers",
        name: "AAPL Low",
        x: [0,-5],
        y: [0,-5],
        };
    var data = [pontos,trace1,trace2];

   
    var frames = [];
    frames.push(
        {
            name: "T-44",
            data: [
            {
              
          },
          {
            x: [0, 15],
            y: [0, 15],
             mode: "lines",
          },
          {
            x: [0, -15],
            y: [0, -15],
             mode: "lines",
          },
      ],
    });

    frames.push({
      name: "T-79",
      data: [
          {                            
        },
        {
          x: [0, 29],
          y: [0, -21],
           mode: "lines",
        },
        {
            x: [0, -29],
            y: [0, +21],
             mode: "lines",
          },
      ],
    });

    frames.push({
      name: "T-101",
      data: [
        {
            
        },
        {
            x: [0, 29, 7],
            y: [0, -21, -23],
             mode: "lines",
        },
        {
            x: [0, -29, -7],
            y: [0, 21, 23],
             mode: "lines",
          },
          
      ],
    });
    frames.push({
      name: "T-138",
      data: [
        {
      },
        {
          x: [0, 29, 7, -8],
          y: [0, -21, -23, -27],
           mode: "lines",
        },
        {
            x: [0, -29, -7, 8],
            y: [0, 21, 23, 27],
             mode: "lines",
          },
          
      ],
    });

    frames.push({
      name: "T-166",
      data: [
        {
        },
        {
            x: [0, 29, 7, -8, 0],
            y: [0, -21, -23, -27, 0],
             mode: "lines",
          },
          {
            x: [0, -29, -7, 8, 0],
            y: [0, 21, 23, 27, 0],
             mode: "lines",
          },
          
      ],
    }); 
    console.log(frames[0])
    Plotly.newPlot("myDiv", {
      data: data,
      layout: {
        sliders: [
          {
            pad: { t: 30 },
            x: 0.05,
            len: 0.95,
            currentvalue: {
              xanchor: "right",
              prefix: "color: ",
              font: {
                color: "#888",
                size: 20,
              },
            },
            transition: { duration: 500 },
            // By default, animate commands are bound to the most recently animated frame:
            steps: [
              {
                label: "T-44",
                method: "animate",
                args: [
                  ["T-44"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500, easing: 'cubic-in-out' },
                  },
                ],
              },
              {
                label: "T-79",
                method: "animate",
                args: [
                  ["T-79"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500, easing: 'cubic-in-out' },
                  },
                ],
              },
              {
                label: "T-101",
                method: "animate",
                args: [
                  ["T-101"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500, easing: 'cubic-in-out' },
                  },
                ],
              },
              {
                label: "T-138",
                method: "animate",
                args: [
                  ["T-138"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500 },
                    transition: { duration: 500, easing: 'cubic-in-out' },
                  },
                ],
              },
              {
                label: "T-166",
                method: "animate",
                args: [
                  ["T-166"],
                  {
                    mode: "immediate",
                    frame: { redraw: false, duration: 500, easing: 'cubic-in-out' },
                    transition: { duration: 500 },
                  },
                ],
              },
            ],
          },
        ],
        updatemenus: [
          {
            type: "buttons",
            showactive: false,
            x: 0.05,
            y: 0,
            xanchor: "right",
            yanchor: "top",
            pad: { t: 60, r: 20 },
            buttons: [
              {
                label: "Play",
                method: "animate",
                args: [
                  null,
                  {
                    fromcurrent: true,
                    frame: { redraw: false, duration: 1000 },
                    transition: { duration: 500 },
                  },
                ],
              },
            ],
          },
        ],
      },
      // The slider itself does not contain any notion of timing, so animating a slider
      // must be accomplished through a sequence of frames. Here we'll change the color
      // and the data of a single trace:
      frames: frames,
    });

}
