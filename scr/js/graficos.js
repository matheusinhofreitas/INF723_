var config={
  scrollZoom: true,
  modeBarButtonsToRemove: ['lasso2d','select2d','toggleSpikelines'],
  responsive: true,
  annotationText: true
}

function grafico_localizacao(instancias, indice){
    //grafico 1 - localização dos clientes e rotas
    //clientes localização
    var clientes = {
        x: instancias[indice].local_x,
        y: instancias[indice].local_y,
        mode: 'markers+text',
        type: "scatter",  
        name: 'Clientes',
        marker: {
            color: instancias[indice].cores_deposito_tarefas,
            size: instancias[indice].demandas,
            opacity: 0.8
        },
        textposition: 'left center',
        text: instancias[indice].nome_clientes, 
        textfont:{ size: '14', color: 'black'},
        hovertext: instancias[indice].inf_clientes_demanda,
        hoverinfo: 'text',
            
    };
    //todas as rotas
    var rotas_all = {
        x: instancias[indice].todas_rotas.x,
        y: instancias[indice].todas_rotas.y,
        mode: 'lines',
        name: 'Rotas',
        line: {
          color: '#c3c3c3',
          width: 1
        }
     };
     
    var layout_grafico1 = {
        xaxis: {
            showgrid: false,
            zeroline: false,
            range: [-45, 45]
        },
        yaxis: {
            showgrid: false,
            zeroline: false,
            range: [-45, 45]
        },
    };
    Plotly.newPlot('mapa_i', [rotas_all,clientes], layout_grafico1, config);
    // FIM - grafico 1 - localização dos clientes e rotas



}

function grafico_tp_por_maquina(instancias, indice){
    
    //grafico 2 - tempos de processamento por máquinas
    //monta os conjuntos de dados para plot
    var barras = [];
    for(var i = 0; i < instancias[indice].n_maquinas; i++){
        barras.push({
            x: instancias[indice].nomes_tarefas,
            y: instancias[indice].tp_maquinas[i],
            name: 'Máquina ' + i,
            marker: {
                color: instancias[indice].cor_maquinas[i],
            },
            textangle: '0',
            type: 'bar',
            orientation: 'v',
            text: instancias[indice].tp_maquinas[i],
            textposition: 'auto',
            hoverinfo: 'none',
        });

    }
    var layout_tp_por_maquina = {
        xaxis: {
            title: 'Tarefas'
        },
        yaxis: {
            title: 'Tempo'
        },
    };
    Plotly.newPlot('tp_i', barras, layout_tp_por_maquina, config);
    //Fim - grafico 2 - tempos de processamento por máquinas


}

function grafico_capacidade_veiculos(instancias, indice, ordenar){

  var aux = []; //=  instancias[indice].capacidade_veiculos;
  var text = [];
  for(var i = 0; i< instancias[indice].capacidade_veiculos.length; i++){
    var conta = instancias[indice].capacidade_veiculos[i] - instancias[indice].ocupacao_veiculos2[i];
   
    aux.push(conta);
    text.push("Capacidade Total: " + instancias[indice].capacidade_veiculos[i]);
  }
  

  //grafico 3 - Capacidades dos veiculos
    var barras_veiculos = {
        x: instancias[indice].nomes_veiculos,
        y: aux,//instancias[indice].capacidade_veiculos,
        name: 'Capacidade Restante',
        type: 'bar',
        orientation: 'v',
        text: aux,//instancias[indice].capacidade_veiculos,
        textposition: 'auto',
        textangle: '0',
        hoverinfo: "text",
        hovertext: text,
        marker:{
          color: "#c3c3c3"
        },
        legendgroup: 1,
        showlegend:false
    };
    var data = [];
    
    for(var i = 0; i <instancias[indice].n_veiculos;i++ ){
      data.push({
        x: instancias[indice].ocupacao_veiculos_aux[i],
        y: instancias[indice].ocupacao_veiculos[i],//instancias[indice].capacidade_veiculos,
        name: 'Ocupação',
        type: 'bar',
        orientation: 'v',
        text: instancias[indice].ocupacao_veiculos_text[i],
        textposition: 'auto',
        hoverinfo: 'none',
        textangle: '0',
        hovertext: instancias[indice].ocupacao_veiculos_text[i],
        marker:{
          color: instancias[indice].ocupacao_veiculos_cor[i]
        },
        showlegend: false,
        legendgroup: 1,
    });

    } 
    data.push(barras_veiculos);
    //console.log(data);
    var barras_ocupacao = {
      x: instancias[indice].nomes_veiculos,
      y: instancias[indice].ocupacao_veiculos,//instancias[indice].capacidade_veiculos,
      name: 'Ocupação',
      type: 'bar',
      orientation: 'v',
      text: instancias[indice].ocupacao_veiculos,
      textposition: 'auto',
      hoverinfo: 'none',
      textangle: '0',
      hovertext: instancias[indice].ocupacao_veiculos,
      marker:{
        color: "#c3c3c3"
      },
      legendgroup: 1,
  };
    var layout_veiculos = {
      barmode: "stack",  
      xaxis: {
            title: 'Veículos'
        },
        yaxis: {
            title: 'Capacidades'
        },
    };
    Plotly.newPlot('veiculos_i', data/*[barras_ocupacao, barras_veiculos]*/, layout_veiculos,config);
    //fim - grafico 3 - Capacidades dos veiculos
    if( ordenar == 1){
      Plotly.relayout('veiculos_i', {
          'xaxis.categoryarray': instancias[indice].veiculos_i_ordenado
        })
      }

}

function grafico_demanda_clientes(instancias, indice, ordenar){
 //grafico 4 - Demandas dos clientes
 var grafico_demanda_clientes = {
    x: instancias[indice].nomes_tarefas,
    y: instancias[indice].demanda_clientes,
    name: 'Demandas Clientes',
    type: 'bar',
    orientation: 'v',
    text: instancias[indice].demanda_clientes,
    textposition: 'auto',
    hoverinfo: 'none',
    textangle: '0',
    marker:{
        color: instancias[indice].cores_tarefas,

    }
};
var layout_demandas_clientes = {
    xaxis: {
        title: 'Tarefas'
    },
    yaxis: {
        title: 'Demandas'
    },
};
Plotly.newPlot('demandas_i', [grafico_demanda_clientes], layout_demandas_clientes, config);
//fim - grafico 4 - Demandas dos clientes
if( ordenar == 1){
  Plotly.relayout('demandas_i', {
      'xaxis.categoryarray': instancias[indice].demandas_i_ordenado
    })
  }

}

//tem a ordenação aqui
function grafico_datas_entregas(instancias, indice, ordenar){
       //grafico 5 - datas de entregas
   var grafoco_datas_entrega = {
    x: instancias[indice].nomes_tarefas,
    y: instancias[indice].datas_entrega,
    name: 'Datas de entrega - Tarefas',
    type: 'bar',
    orientation: 'v',
    text: instancias[indice].datas_entrega,
    textposition: 'auto',
    hoverinfo: 'none',
    textangle: '0',
    marker:{
        color: instancias[indice].cores_tarefas,
    }
};
var layout_datas_entrega = {
    xaxis: {
        title: 'Tarefas',
        //ticktext: ordernar==0 ? instancias[indice].nomes_tarefas : instancias[indice].datas_entrega_i_ordenado,
    },
    yaxis: {
        title: 'Tempo'
    },
};
Plotly.newPlot('datas_entrega_i', [grafoco_datas_entrega], layout_datas_entrega, config);
//orderar os graficos.
if( ordenar == 1){
Plotly.relayout('datas_entrega_i', {
    'xaxis.categoryarray': instancias[indice].datas_entrega_i_ordenado
  })
}

//fim - grafico 5 - Demandas dos clientes
}

function grafico_planejamento(instancias, indice){
    var barras_tarefas = [];
    for(var i = 0; i < instancias[indice].tps_setups.length; i++){
        for(var j = 0; j < instancias[indice].tps_setups[i].length; j++){
                  barras_tarefas.push({
                x: [instancias[indice].tps_setups[i][j].tempo],
                y: ['M'+i],
                orientation: "h",
                type: "bar",
                marker: {
                    color: instancias[indice].tps_setups[i][j].tarefa != -1 ? instancias[indice].cores_deposito_tarefas[instancias[indice].tps_setups[i][j].tarefa] : instancias[indice].cinza
                },
                showlegend: instancias[indice].tps_setups[i][j].tarefa != -1 ? true : false, //esconde ou mostra na legenda
                legendgroup: 'M'+i,
                name: instancias[indice].tps_setups[i][j].tarefa != -1 ? 'T'+instancias[indice].tps_setups[i][j].tarefa : '' ,
                text: instancias[indice].tps_setups[i][j].tarefa != -1 ?'T'+instancias[indice].tps_setups[i][j].tarefa+'<br>'+instancias[indice].tps_setups[i][j].tempo : instancias[indice].tps_setups[i][j].tempo ,
                textposition: "auto",
                hoverinfo: "text",
                hovertext: instancias[indice].texto_sequenciamento[instancias[indice].tps_setups[i][j].tarefa],
                insidetextanchor: "middle",
            });
        }
    }
    var layout2 = {
        barmode: "stack",

        xaxis: {
          //range: [0, auto],
          autorange: true,
          autotick: false,
          //tick0: 0,
          dtick: 10,
        },
      };
      Plotly.newPlot("producao_s", barras_tarefas, layout2,config);

}

function grafico_atraso_tarefas(instancias, indice, ordenar){
 // grafico atraso
 var grafico_atrasos = {
    x: instancias[indice].nomes_tarefas,
    y: instancias[indice].atraso,
    name: "Atrasos Tarefas",
    type: "bar",
    text: instancias[indice].atraso,
    marker: {
      color: instancias[indice].cores_tarefas
    },
    textposition: "auto",
    hoverinfo: "none",
  };
  var layoutAtraso = {
    xaxis: { title: "Tarefas" },
    yaxis: { title: "Atraso" },
  };
  Plotly.newPlot("atraso_s", [grafico_atrasos], layoutAtraso,config);

  if( ordenar == 1){
    Plotly.relayout('atraso_s', {
        'xaxis.categoryarray': instancias[indice].atraso_s_ordenado
      })
    }
}

function grafico_rotas(instancias, indice){
    var clientes = {
        x: instancias[indice].local_x,
        y: instancias[indice].local_y,
        mode: 'markers+text',
        type: "scatter",  
        name: 'Clientes',
        marker: {
            color: instancias[indice].cores_deposito_tarefas,
            size: instancias[indice].demandas,
            opacity: 0.8
        },
        textposition: 'left center',
        text: instancias[indice].nome_clientes, 
        textfont:{ size: '14', color: 'black'},
        hovertext: instancias[indice].inf_clientes,
        hoverinfo: 'text',
            
    };
        
        var rotas = [];
        for(var i = 0; i < instancias[indice].n_veiculos; i++){
            rotas.push({
                x: instancias[indice].rotas_s[i].x,
                y: instancias[indice].rotas_s[i].y,
                mode: "lines",
                name: "Rota Veic. V"+i,
                line: { 
                    color: "rgb(30, 30, 30)", 
                    width: 1 
                },
            });
        }  
        rotas.push(clientes);
    
        var layout = {
          xaxis: {
                showgrid: false,
                zeroline: false,
                range: [-45, 45]
            },
            yaxis: {
                showgrid: false,
                zeroline: false,
                range: [-45, 45]
            },
            annotations: instancias[indice].anotacao,
          };
          
          Plotly.newPlot("rotas_s", rotas, layout,config);

       /*   
        Plotly.newPlot("rotas_s", {
            data: [instancias[indice].clientes,rotas],
            layout:layout_animado,
            // The slider itself does not contain any notion of timing, so animating a slider
            // must be accomplished through a sequence of frames. Here we'll change the color
            // and the data of a single trace:
            frames: frames,
          });
            
    */
    
    }


function grafico_objetivos(instancias, indice){
  var obj1 = instancias[indice].obj1/instancias[indice].funcao_objetivo*100;
  var obj2 = instancias[indice].obj2/instancias[indice].funcao_objetivo*100;
  var obj3 = instancias[indice].obj3/instancias[indice].funcao_objetivo*100;
  
var obj1_all = [obj1];
var obj2_all = [obj2];
var obj3_all = [obj3];
var cores = [1];
var nome_instancia = instancias[indice].nome;
var n_i;
if(instancias[indice].replicao == 10)
  n_i = nome_instancia.slice(0, nome_instancia.length-7);
else
  n_i = nome_instancia.slice(0, nome_instancia.length-6);

 
for(var i = 0; i < instancias.length ;i++){
  var n = instancias[i].nome;
  if(i != indice && n.includes(n_i)){
    obj1_all.push(instancias[i].obj1/instancias[i].funcao_objetivo*100);
    obj2_all.push(instancias[i].obj2/instancias[i].funcao_objetivo*100);
    obj3_all.push(instancias[i].obj3/instancias[i].funcao_objetivo*100);
    cores.push("3");
  }
}
var trace = {
  type: 'parcoords',
  pad: [33,33,33],

  line: {
    color: cores,
    colorscale: [[0, '#8e24aa'],  [1, '#c3c3c3']]
  },
  dimensions: [{
    range: [0, 100],
    label: 'OBJ 1',
    values: obj1_all,
  }, {    
    range: [0, 100],
    label: 'OBJ 2',
    values: obj2_all,
  }, {
    range: [0, 100],
    label: 'OBJ 3',
    values: obj3_all,
  }]
};

  
  var data = [trace]
  
  Plotly.newPlot('objetivos_s', data,{},config);


}

function grafico_completion_time(instancias, indice, ordenar){
  // grafico atraso
  var grafico = {
     x: instancias[indice].nomes_tarefas,
     y: instancias[indice].completionTime,
     name: "Completion Time",
     type: "bar",
     text: instancias[indice].completionTime,
     marker: {
       color: instancias[indice].cores_tarefas
     },
     textposition: "auto",
     hoverinfo: "none",
   };
   var layout = {
     xaxis: { title: "Tarefas" },
     yaxis: { title: "Tempo" },
   };
   Plotly.newPlot("completion_Time_s", [grafico], layout,config);
 
   if( ordenar == 1){
     Plotly.relayout('completion_Time_s', {
         'xaxis.categoryarray': instancias[indice].completionTime_s_ordenado
       })
     }
 }



function grafico_rotas_animado(instancias, indice){
//-------------------------- AQUI É oS RESULTADOS -------------------------------------


    //producao_s
    var numero = 16;
    
    
    
    
    
    

     

      //========================= grafico animado da rota===================
      var n_veiculos = 4;
      var rotas_s = [
        {x:[0, 29, 7, -8, 0],y:[0, -21, -23, -27, 0]},
        {x:[0, 25, 29, 0],y:[0, 0, 21, 0]},
        {x:[0, 10, -9, 0],y:[0, 30, 29, 0]},
        {x:[0, -28, -28, -26, 0],y:[0, -20, 0, 19, 0]},
    ]
    
    var rotas = [];
    for(var i = 0; i < n_veiculos; i++){
        rotas.push({
            x: rotas_s[i].x,
            y: rotas_s[i].y,
            mode: "lines",
            name: "Rota Veic."+i,
            line: { 
                color: "rgb(30, 30, 30)", 
                width: 1 
            },
        });
    }  
    rotas.push(clientes);

    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: "AAPL Low",
        x: [0,0],
        y: [0,0],
        line: { color: "red" },
      };
      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: "AAPL Low",
        x: [0,0],
        y: [0,0],
        line: { color: "blue" },
      };

   
      
    var tempos_entregas = [
        {tempo: 78, tarefa:0, ini:0},
        {tempo: 79, tarefa:10, ini:0},
        {tempo: 80,tarefa:3, ini:0},
        {tempo: 99,tarefa:4, ini:3},
        {tempo:101,tarefa:9, ini:10},
        {tempo:115,tarefa:7, ini:0},
        {tempo:116,tarefa:8, ini:9},
        {tempo:135,tarefa:6, ini:7},
        {tempo:154,tarefa:5, ini:6},
        {tempo:174,tarefa:1, ini:0},
        {tempo:195,tarefa:2, ini:1},
    ]
/*
    Rota 0 : 0, 10, 9, 8, 0
    Rota 1 : 0, 1, 2, 0
    Rota 2 : 0, 3, 4, 0
    Rota 3 : 0, 7, 6, 5, 0
    Rota 4 : 0, 0, 0
*/
    var steps = [];
    for(var i = 0; i < tempos_entregas.length; i++){
        steps.push(
        {
            label: tempos_entregas[i].tempo,
            method: "animate",
            args: [
                ['T-'+tempos_entregas[i].tempo],
                {
                mode: "immediate",
                frame: { redraw: false, duration: 500 },
                transition: { duration: 500, easing: 'cubic-in-out' },
                },
            ],
            }
        );

    }
       
    
    var rota0 = {
      x: [[0,0], [0, 29],[0, 29, 7],[0, 29, 7, -8],[0, 29, 7, -8, 0]],
      y: [[0,0],[0, -21],[0, -21, -23],[0, -21, -23, -27],[0, -21, -23, -27, 0]],
    };
    var rota1 = {
      x: [[0,0],[0, 25],[0, 25, 27], [0, 25, 27, 29],[0, 25, 27, 29, 0]],
      y: [[0,0],[0,0],[0, 0, 10],[0, 0,10, 21],[0, 0, 10,21, 0]]
    };
    var rota2 = {
      x: [0, 10, -9, 0],
      y: [0, 30, 29, 0],
    };
    var rota3 = {
      x: [0, -28, -28, -26, 0],
      y: [0, -20, 0, 19, 0],
    };
    var rota4 = {
      x: [0, 0, 0],
      y: [0, 0, 0],
    };

    var px = [ [0,0],[0,29],[0,29,7],[0,29,7,-8],[0,29,7,-8,0] ];
    var py = [ [0,0], [0,-21],[0,-21,-23],[0,-21,-23,-27],[0,-21,-23,-27,0]];
    
    var frames = [];
    for(var i = 0; i < 5; i++){
        frames.push({
            name: 'T-'+tempos_entregas[i].tempo,
            data: [
              
              {},
              //rota 1
              {
                x: rota0.x[i],
                y: rota0.y[i],
                 mode: "lines",
              },
              //rota 2
              {
                x: rota1.x[i],
                y: rota1.y[i],
                 mode: "lines",
              }
            ],
        });
        //console.log(i);
       // console.log(px);
      // break;
    }


    /*var frames = [];
    var px = [ [0,0],[0,29],[0,29,7],[0,29,7,-8],[0,29,7,-8,0] ];
    var py = [ [0,0], [0,-21],[0,-21,-23],[0,-21,-23,-27],[0,-21,-23,-27,0]];
    for(var i = 0; i < tempos_entregas.length-6; i++){
        frames.push({
            name: 'T-'+tempos_entregas[i].tempo,
            data: [
              {
                x: px,
                y: py,
                 mode: "lines",
              }
            ],
        });
        //console.log(i);
       // console.log(px);
      // break;
    }
    */
   console.log("Steps\n");
   console.log(steps);
   console.log("frame\n");
   console.log(frames[1]);
   //graficos_solucao(); 
   //rota_animada2();
   var layout_animado =  {
    sliders: [
      {
        pad: { t: 30 },
        x: 0.05,
        len: 0.95,
        currentvalue: {
          xanchor: "right",
          prefix: "Tempo: ",
          font: {
            color: "#888",
            size: 20,
          },
        },
        transition: { duration: 500 },
        // By default, animate commands are bound to the most recently animated frame:
        steps: steps,
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
        }
    // grafico das rotas sem animação
    //Plotly.newPlot("rotas_s", rotas, layout_animado);
    
    
    Plotly.newPlot("rotas_s", {
        data: [clientes,trace1,trace2],
        layout:layout_animado,
        // The slider itself does not contain any notion of timing, so animating a slider
        // must be accomplished through a sequence of frames. Here we'll change the color
        // and the data of a single trace:
        frames: frames,
      });
        


}