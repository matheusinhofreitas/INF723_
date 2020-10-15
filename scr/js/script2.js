$(document).ready(function(){
    //variaveis grafico 1 - mapa dos clientes.
    //cores deposito + tarefas 

    var instancias = [
        
        {nome:'M_4_N_10_S_1-99_R_5.txt',
        n_tarefas:10,
        n_maquinas:4,
        n_veiculos:5,
        funcao_objetivo : 7970,
        obj1 : 3077,
        obj2 : 3400,
        obj3 : 1493,
        gap : 0.160459,
        tempo_execucao :24439.2,
        capacidade_Total :986,
        demanda_Total :285,
        setup_min :1,
        setup_max : 99,
        raio : 30,
        circulos :1,
        TP_min : 1,
        TP_max : 99,
        demanda_min : 10,
        demanda_max : 30,
        priority_factor : 0.2,
        range_factor : 0.8,
        cores_deposito_tarefas : ['#000','#003f5c','#58508d','#bc5090','#ff6361','#ffa600','#81017b','#c10048','#c84a00','#9c8c00','#01be16',],
        cores_tarefas : ['#003f5c','#58508d','#bc5090','#ff6361','#ffa600','#81017b','#c10048','#c84a00','#9c8c00','#01be16',],
        demandas : [1,22,52,39,62,17,65,11,36,25,56,],
        local_x : [0,25,29,10,-9,-26,-28,-28,-8,7,29,],
        local_y : [0,0,21,30,29,19,0,-20,-27,-23,-21,],
        nome_clientes : ['deposito','T1','T2','T3','T4','T5','T6','T7','T8','T9','T10',],
        inf_clientes_demanda : ['Deposito',
        'T1<br>Dem: 12',
        'T2<br>Dem: 42',
        'T3<br>Dem: 29',
        'T4<br>Dem: 52',
        'T5<br>Dem: 7',
        'T6<br>Dem: 55',
        'T7<br>Dem: 1',
        'T8<br>Dem: 26',
        'T9<br>Dem: 15',
        'T10<br>Dem: 46',
        ],
        inf_clientes : ['Deposito',
        'T1<br>Dem: 12<br>DT Entrega: 174',
        'T2<br>Dem: 42<br>DT Entrega: 195',
        'T3<br>Dem: 29<br>DT Entrega: 80',
        'T4<br>Dem: 52<br>DT Entrega: 99',
        'T5<br>Dem: 7<br>DT Entrega: 154',
        'T6<br>Dem: 55<br>DT Entrega: 135',
        'T7<br>Dem: 1<br>DT Entrega: 115',
        'T8<br>Dem: 26<br>DT Entrega: 116',
        'T9<br>Dem: 15<br>DT Entrega: 101',
        'T10<br>Dem: 46<br>DT Entrega: 79',
        ],
        todas_rotas : {
        x: [,0,25,0,29,0,10,0,-9,0,-26,0,-28,0,-28,0,-8,0,7,0,29,25,0,,25,29,25,10,25,-9,25,-26,25,-28,25,-28,25,-8,25,7,25,29,29,0,29,25,,29,10,29,-9,29,-26,29,-28,29,-28,29,-8,29,7,29,29,10,0,10,25,10,29,,10,-9,10,-26,10,-28,10,-28,10,-8,10,7,10,29,-9,0,-9,25,-9,29,-9,10,,-9,-26,-9,-28,-9,-28,-9,-8,-9,7,-9,29,-26,0,-26,25,-26,29,-26,10,-26,-9,,-26,-28,-26,-28,-26,-8,-26,7,-26,29,-28,0,-28,25,-28,29,-28,10,-28,-9,-28,-26,,-28,-28,-28,-8,-28,7,-28,29,-28,0,-28,25,-28,29,-28,10,-28,-9,-28,-26,-28,-28,,-28,-8,-28,7,-28,29,-8,0,-8,25,-8,29,-8,10,-8,-9,-8,-26,-8,-28,-8,-28,,-8,7,-8,29,7,0,7,25,7,29,7,10,7,-9,7,-26,7,-28,7,-28,7,-8,,7,29,29,0,29,25,29,29,29,10,29,-9,29,-26,29,-28,29,-28,29,-8,29,7,],
        y:[,0,0,0,21,0,30,0,29,0,19,0,0,0,-20,0,-27,0,-23,0,-21,0,0,,0,21,0,30,0,29,0,19,0,0,0,-20,0,-27,0,-23,0,-21,21,0,21,0,,21,30,21,29,21,19,21,0,21,-20,21,-27,21,-23,21,-21,30,0,30,0,30,21,,30,29,30,19,30,0,30,-20,30,-27,30,-23,30,-21,29,0,29,0,29,21,29,30,,29,19,29,0,29,-20,29,-27,29,-23,29,-21,19,0,19,0,19,21,19,30,19,29,,19,0,19,-20,19,-27,19,-23,19,-21,0,0,0,0,0,21,0,30,0,29,0,19,,0,-20,0,-27,0,-23,0,-21,-20,0,-20,0,-20,21,-20,30,-20,29,-20,19,-20,0,,-20,-27,-20,-23,-20,-21,-27,0,-27,0,-27,21,-27,30,-27,29,-27,19,-27,0,-27,-20,,-27,-23,-27,-21,-23,0,-23,0,-23,21,-23,30,-23,29,-23,19,-23,0,-23,-20,-23,-27,,-23,-21,-21,0,-21,0,-21,21,-21,30,-21,29,-21,19,-21,0,-21,-20,-21,-27,-21,-23,]},
        tp_maquinas : [
        [71,69,75,49,20,72,43,27,95,61,],
        [93,38,33,59,18,67,56,96,61,36,],
        [94,60,97,48,76,86,97,3,38,32,],
        [61,73,10,93,65,28,4,38,56,83,],
        ],
        nomes_tarefas : ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10',],
        cor_maquinas : ['#F00','#0F0','#00F','#0FF',],
        nomes_veiculos : ['V0','V1','V2','V3','V4',],
        capacidade_veiculos: [98,76,103,63,153,],
        demanda_clientes : [12,42,29,52,7,55,1,26,15,46,],
        datas_entrega : [88,74,75,89,112,107,110,116,78,68,],
        tps_setups : [
        [{tempo: 49, tarefa:4},{tempo: 29, tarefa:-1},{tempo: 71, tarefa:1},],
        [{tempo: 36, tarefa:10},{tempo: 27, tarefa:-1},{tempo: 18, tarefa:5},],
        [{tempo: 3, tarefa:8},{tempo: 3, tarefa:-1},{tempo: 38, tarefa:9},{tempo: 37, tarefa:-1},{tempo: 60, tarefa:2},],
        [{tempo: 10, tarefa:3},{tempo: 9, tarefa:-1},{tempo: 4, tarefa:7},{tempo: 22, tarefa:-1},{tempo: 28, tarefa:6},],
        ],
        texto_sequenciamento : ['','T1<br>CT: 149',
        'T2<br>CT: 141',
        'T3<br>CT: 10',
        'T4<br>CT: 49',
        'T5<br>CT: 81',
        'T6<br>CT: 73',
        'T7<br>CT: 23',
        'T8<br>CT: 3',
        'T9<br>CT: 44',
        'T10<br>CT: 36',
        ],
        cinza : '#c3c3c3',
        atraso : [86,121,5,10,42,28,5,0,23,11,],
        rotas_s: [
        { x: [0,29,7,-8, 0 ], y : [0,-21,-23,-27, 0 ]},
        { x: [0,25,29, 0 ], y : [0,0,21, 0 ]},
        { x: [0,10,-9, 0 ], y : [0,30,29, 0 ]},
        { x: [0,-28,-28,-26, 0 ], y : [0,-20,0,19, 0 ]},
        { x: [0,0, 0 ], y : [0,0, 0 ]},],
        }






    ];
    grafico_localizacao(instancias, 0);
    grafico_tp_por_maquina(instancias, 0);
    grafico_capacidade_veiculos(instancias, 0);
    grafico_demanda_clientes(instancias, 0);
    grafico_datas_entregas(instancias, 0);
    grafico_planejamento(instancias, 0);
    grafico_atraso_tarefas(instancias, 0);
    grafico_rotas(instancias, 0);
    grafico_tp_por_maquina(instancias,0)
});