// Componente de Formulário

class FormComponent {
    constructor() {
        this.municipiosPrioritariosAltaRenda = [
            'ABADIA DE GOIÁS', 'ALEXÂNIA', 'ANÁPOLIS', 'APARECIDA DE GOIÂNIA', 
            'BRAZABRANTES', 'CALDAZINHA', 'CAMPO LIMPO DE GOIÁS', 'CATURAÍ', 
            'CIDADE OCIDENTAL', 'CRISTALINA', 'FORMOSA', 'GAMELEIRA DE GOIÁS', 
            'GOIANÁPOLIS', 'GOIÂNIA', 'GOIANIRA', 'GUAPÓ', 'HIDROLÂNDIA', 
            'INHUMAS', 'LUZIÂNIA', 'NERÓPOLIS', 'NOVA VENEZA', 'NOVO GAMA', 
            'SANTO ANTÔNIO DE GOIÁS', 'SANTO ANTÔNIO DO DESCOBERTO', 'SENADOR CANEDO', 
            'TEREZÓPOLIS DE GOIÁS', 'TRINDADE', 'VALPARAÍSO DE GOIÁS', 'CUIABÁ', 
            'RONDONÓPOLIS', 'SINOP', 'SORRISO', 'TANGARÁ DA SERRA', 'VÁRZEA GRANDE', 
            'CAMPO GRANDE', 'DOURADOS', 'TRÊS LAGOAS', 'BRASÍLIA'
        ];
        
        this.municipalityData = {
            'DF': [
                { name: 'BRASÍLIA', prioridade_espacial: 'DEMAIS' }
            ],
            'GO': [
                { name: 'ABADIA DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'ABADIÂNIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ACREÚNA', prioridade_espacial: 'DEMAIS' },
                { name: 'ADELÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ÁGUA FRIA DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ÁGUA LIMPA', prioridade_espacial: 'DEMAIS' },
                { name: 'ÁGUAS LINDAS DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ALEXÂNIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ALOÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'ALTO HORIZONTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ALTO PARAÍSO DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ALVORADA DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'AMARALINA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'AMERICANO DO BRASIL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'AMORINÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'ANÁPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ANHANGUERA', prioridade_espacial: 'DEMAIS' },
                { name: 'ANICUNS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'APARECIDA DE GOIÂNIA', prioridade_espacial: 'DEMAIS' },
                { name: 'APARECIDA DO RIO DOCE', prioridade_espacial: 'DEMAIS' },
                { name: 'APORÉ', prioridade_espacial: 'DEMAIS' },
                { name: 'ARAÇU', prioridade_espacial: 'DEMAIS' },
                { name: 'ARAGARÇAS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ARAGOIÂNIA', prioridade_espacial: 'DEMAIS' },
                { name: 'ARAGUAPAZ', prioridade_espacial: 'DEMAIS' },
                { name: 'ARENÓPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ARUANÃ', prioridade_espacial: 'DEMAIS' },
                { name: 'AURILÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'AVELINÓPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BALIZA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BARRO ALTO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BELA VISTA DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'BOM JARDIM DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BOM JESUS DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'BONFINÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'BONÓPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BRAZABRANTES', prioridade_espacial: 'DEMAIS' },
                { name: 'BRITÂNIA', prioridade_espacial: 'DEMAIS' },
                { name: 'BURITI ALEGRE', prioridade_espacial: 'DEMAIS' },
                { name: 'BURITI DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BURITINÓPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CABECEIRAS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CACHOEIRA ALTA', prioridade_espacial: 'DEMAIS' },
                { name: 'CACHOEIRA DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'CACHOEIRA DOURADA', prioridade_espacial: 'DEMAIS' },
                { name: 'CAÇU', prioridade_espacial: 'DEMAIS' },
                { name: 'CAIAPÔNIA', prioridade_espacial: 'DEMAIS' },
                { name: 'CALDAS NOVAS', prioridade_espacial: 'DEMAIS' },
                { name: 'CALDAZINHA', prioridade_espacial: 'DEMAIS' },
                { name: 'CAMPESTRE DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'CAMPINAÇU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CAMPINORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CAMPO ALEGRE DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'CAMPO LIMPO DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'CAMPOS BELOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CAMPOS VERDES', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CARMO DO RIO VERDE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CASTELÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'CATALÃO', prioridade_espacial: 'DEMAIS' },
                { name: 'CATURAÍ', prioridade_espacial: 'DEMAIS' },
                { name: 'CAVALCANTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CERES', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CEZARINA', prioridade_espacial: 'DEMAIS' },
                { name: 'CHAPADÃO DO CÉU', prioridade_espacial: 'DEMAIS' },
                { name: 'CIDADE OCIDENTAL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'COCALZINHO DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'COLINAS DO SUL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CÓRREGO DO OURO', prioridade_espacial: 'DEMAIS' },
                { name: 'CORUMBÁ DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CORUMBAÍBA', prioridade_espacial: 'DEMAIS' },
                { name: 'CRISTALINA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CRISTIANÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'CRIXÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CROMÍNIA', prioridade_espacial: 'DEMAIS' },
                { name: 'CUMARI', prioridade_espacial: 'DEMAIS' },
                { name: 'DAMIANÓPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'DAMOLÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'DAVINÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'DIORAMA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'DIVINÓPOLIS DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'DOVERLÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'EDEALINA', prioridade_espacial: 'DEMAIS' },
                { name: 'EDÉIA', prioridade_espacial: 'DEMAIS' },
                { name: 'ESTRELA DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'FAINA', prioridade_espacial: 'DEMAIS' },
                { name: 'FAZENDA NOVA', prioridade_espacial: 'DEMAIS' },
                { name: 'FIRMINÓPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'FLORES DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'FORMOSA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'FORMOSO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GAMELEIRA DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'GOIANÁPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'GOIANDIRA', prioridade_espacial: 'DEMAIS' },
                { name: 'GOIANÉSIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GOIÂNIA', prioridade_espacial: 'DEMAIS' },
                { name: 'GOIANIRA', prioridade_espacial: 'DEMAIS' },
                { name: 'GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GOIATUBA', prioridade_espacial: 'DEMAIS' },
                { name: 'GOUVELÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'GUAPÓ', prioridade_espacial: 'DEMAIS' },
                { name: 'GUARAÍTA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GUARANI DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GUARINOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'HEITORAÍ', prioridade_espacial: 'DEMAIS' },
                { name: 'HIDROLÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'HIDROLINA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'IACIARA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'INACIOLÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'INDIARA', prioridade_espacial: 'DEMAIS' },
                { name: 'INHUMAS', prioridade_espacial: 'DEMAIS' },
                { name: 'IPAMERI', prioridade_espacial: 'DEMAIS' },
                { name: 'IPIRANGA DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'IPORÁ', prioridade_espacial: 'DEMAIS' },
                { name: 'ISRAELÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'ITABERAÍ', prioridade_espacial: 'DEMAIS' },
                { name: 'ITAGUARI', prioridade_espacial: 'DEMAIS' },
                { name: 'ITAGUARU', prioridade_espacial: 'DEMAIS' },
                { name: 'ITAJÁ', prioridade_espacial: 'DEMAIS' },
                { name: 'ITAPACI', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ITAPIRAPUÃ', prioridade_espacial: 'DEMAIS' },
                { name: 'ITAPURANGA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ITARUMÃ', prioridade_espacial: 'DEMAIS' },
                { name: 'ITAUÇU', prioridade_espacial: 'DEMAIS' },
                { name: 'ITUMBIARA', prioridade_espacial: 'DEMAIS' },
                { name: 'IVOLÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'JANDAIA', prioridade_espacial: 'DEMAIS' },
                { name: 'JARAGUÁ', prioridade_espacial: 'DEMAIS' },
                { name: 'JATAÍ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JAUPACI', prioridade_espacial: 'DEMAIS' },
                { name: 'JESÚPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'JOVIÂNIA', prioridade_espacial: 'DEMAIS' },
                { name: 'JUSSARA', prioridade_espacial: 'DEMAIS' },
                { name: 'LAGOA SANTA', prioridade_espacial: 'DEMAIS' },
                { name: 'LEOPOLDO DE BULHÕES', prioridade_espacial: 'DEMAIS' },
                { name: 'LUZIÂNIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MAIRIPOTABA', prioridade_espacial: 'DEMAIS' },
                { name: 'MAMBAÍ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MARA ROSA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MARZAGÃO', prioridade_espacial: 'DEMAIS' },
                { name: 'MATRINCHÃ', prioridade_espacial: 'DEMAIS' },
                { name: 'MAURILÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'MIMOSO DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MINAÇU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MINEIROS', prioridade_espacial: 'DEMAIS' },
                { name: 'MOIPORÁ', prioridade_espacial: 'DEMAIS' },
                { name: 'MONTE ALEGRE DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MONTES CLAROS DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MONTIVIDIU', prioridade_espacial: 'DEMAIS' },
                { name: 'MONTIVIDIU DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MORRINHOS', prioridade_espacial: 'DEMAIS' },
                { name: 'MORRO AGUDO DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MOSSÂMEDES', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MOZARLÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MUNDO NOVO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MUTUNÓPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NAZÁRIO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NERÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'NIQUELÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA AMÉRICA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA AURORA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA CRIXÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA GLÓRIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA IGUAÇU DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA ROMA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA VENEZA', prioridade_espacial: 'DEMAIS' },
                { name: 'NOVO BRASIL', prioridade_espacial: 'DEMAIS' },
                { name: 'NOVO GAMA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVO PLANALTO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ORIZONA', prioridade_espacial: 'DEMAIS' },
                { name: 'OURO VERDE DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'OUVIDOR', prioridade_espacial: 'DEMAIS' },
                { name: 'PADRE BERNARDO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PALESTINA DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'PALMEIRAS DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'PALMELO', prioridade_espacial: 'DEMAIS' },
                { name: 'PALMINÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'PANAMÁ', prioridade_espacial: 'DEMAIS' },
                { name: 'PARANAIGUARA', prioridade_espacial: 'DEMAIS' },
                { name: 'PARAÚNA', prioridade_espacial: 'DEMAIS' },
                { name: 'PEROLÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'PETROLINA DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'PILAR DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PIRACANJUBA', prioridade_espacial: 'DEMAIS' },
                { name: 'PIRANHAS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PIRENÓPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PIRES DO RIO', prioridade_espacial: 'DEMAIS' },
                { name: 'PLANALTINA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PONTALINA', prioridade_espacial: 'DEMAIS' },
                { name: 'PORANGATU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PORTEIRÃO', prioridade_espacial: 'DEMAIS' },
                { name: 'PORTELÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'POSSE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PROFESSOR JAMIL', prioridade_espacial: 'DEMAIS' },
                { name: 'QUIRINÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'RIALMA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RIANÁPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RIO QUENTE', prioridade_espacial: 'DEMAIS' },
                { name: 'RIO VERDE', prioridade_espacial: 'DEMAIS' },
                { name: 'RUBIATABA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANCLERLÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTA BÁRBARA DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTA CRUZ DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTA FÉ DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTA HELENA DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTA ISABEL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTA RITA DO ARAGUAIA', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTA RITA DO NOVO DESTINO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTA ROSA DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTA TEREZA DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTA TEREZINHA DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTO ANTÔNIO DA BARRA', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTO ANTÔNIO DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTO ANTÔNIO DO DESCOBERTO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO DOMINGOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO FRANCISCO DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'SÃO JOÃO DA PARAÚNA', prioridade_espacial: 'DEMAIS' },
                { name: 'SÃO JOÃO D\'ALIANÇA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO LUÍS DE MONTES BELOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO LUÍZ DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO MIGUEL DO ARAGUAIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO MIGUEL DO PASSA QUATRO', prioridade_espacial: 'DEMAIS' },
                { name: 'SÃO PATRÍCIO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO SIMÃO', prioridade_espacial: 'DEMAIS' },
                { name: 'SENADOR CANEDO', prioridade_espacial: 'DEMAIS' },
                { name: 'SERRANÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'SILVÂNIA', prioridade_espacial: 'DEMAIS' },
                { name: 'SIMOLÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÍTIO D\'ABADIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TAQUARAL DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'TERESINA DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TEREZÓPOLIS DE GOIÁS', prioridade_espacial: 'DEMAIS' },
                { name: 'TRÊS RANCHOS', prioridade_espacial: 'DEMAIS' },
                { name: 'TRINDADE', prioridade_espacial: 'DEMAIS' },
                { name: 'TROMBAS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TURVÂNIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TURVELÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'UIRAPURU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'URUAÇU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'URUANA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'URUTAÍ', prioridade_espacial: 'DEMAIS' },
                { name: 'VALPARAÍSO DE GOIÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'VARJÃO', prioridade_espacial: 'DEMAIS' },
                { name: 'VIANÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'VICENTINÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'VILA BOA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'VILA PROPÍCIO', prioridade_espacial: 'PRIORITÁRIA' }
            ],
            'MT': [
                { name: 'ACORIZAL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ÁGUA BOA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ALTA FLORESTA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ALTO ARAGUAIA', prioridade_espacial: 'DEMAIS' },
                { name: 'ALTO BOA VISTA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ALTO PARAGUAI', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ALTO TAQUARI', prioridade_espacial: 'DEMAIS' },
                { name: 'ALTO GARÇAS', prioridade_espacial: 'DEMAIS' },
                { name: 'APIACÁS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ARAGUAIANA', prioridade_espacial: 'DEMAIS' },
                { name: 'ARAGUAINHA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ARAPUTANGA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ARENÁPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ARIPUANÃ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BARÃO DE MELGAÇO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BARRA DO GARÇAS', prioridade_espacial: 'DEMAIS' },
                { name: 'BARRA DO BUGRES', prioridade_espacial: 'DEMAIS' },
                { name: 'BOM JESUS DO ARAGUAIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BRASNORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CÁCERES', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CAMPINÁPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CAMPO NOVO DO PARECIS', prioridade_espacial: 'DEMAIS' },
                { name: 'CAMPO VERDE', prioridade_espacial: 'DEMAIS' },
                { name: 'CAMPOS DE JÚLIO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CANABRAVA DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CANARANA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CARLINDA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CASTANHEIRA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CHAPADA DOS GUIMARÃES', prioridade_espacial: 'DEMAIS' },
                { name: 'CLÁUDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'COCALINHO', prioridade_espacial: 'DEMAIS' },
                { name: 'COLÍDER', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'COLNIZA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'COMODORO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CONFRESA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CONQUISTA D\'OESTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'COTRIGUAÇU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CUIABÁ', prioridade_espacial: 'DEMAIS' },
                { name: 'CURVELÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'DENISE', prioridade_espacial: 'DEMAIS' },
                { name: 'DIAMANTINO', prioridade_espacial: 'DEMAIS' },
                { name: 'DOM AQUINO', prioridade_espacial: 'DEMAIS' },
                { name: 'FELIZ NATAL', prioridade_espacial: 'DEMAIS' },
                { name: 'FIGUEIRÓPOLIS D\'OESTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GAÚCHA DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GENERAL CARNEIRO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GLÓRIA D\'OESTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GUARANTÃ DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GUIRATINGA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'INDIAVAÍ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'IPIRANGA DO NORTE', prioridade_espacial: 'DEMAIS' },
                { name: 'ITANHANGÁ', prioridade_espacial: 'DEMAIS' },
                { name: 'ITAÚBA', prioridade_espacial: 'DEMAIS' },
                { name: 'ITIQUIRA', prioridade_espacial: 'DEMAIS' },
                { name: 'JACIARA', prioridade_espacial: 'DEMAIS' },
                { name: 'JANGADA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JAURU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JUARA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JUÍNA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JURUENA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JUSCIMEIRA', prioridade_espacial: 'DEMAIS' },
                { name: 'LAMBARI D\'OESTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'LUCAS DO RIO VERDE', prioridade_espacial: 'DEMAIS' },
                { name: 'LUCIARA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MARCELÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'MATUPÁ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MIRASSOL D\'OESTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOBRES', prioridade_espacial: 'DEMAIS' },
                { name: 'NORTELÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOSSA SENHORA DO LIVRAMENTO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA BANDEIRANTES', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA BRASILÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA CANAÃ DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA GUARITA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA LACERDA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA MARILÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA MARINGÁ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA MONTE VERDE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA MUTUM', prioridade_espacial: 'DEMAIS' },
                { name: 'NOVA NAZARÉ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA OLÍMPIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA SANTA HELENA', prioridade_espacial: 'DEMAIS' },
                { name: 'NOVA UBIRATÃ', prioridade_espacial: 'DEMAIS' },
                { name: 'NOVA XAVANTINA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVO HORIZONTE DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVO MUNDO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVO SANTO ANTÔNIO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVO SÃO JOAQUIM', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PARANAÍTA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PARANATINGA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PEDRA PRETA', prioridade_espacial: 'DEMAIS' },
                { name: 'PEIXOTO DE AZEVEDO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PLANALTO DA SERRA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'POCONÉ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PONTAL DO ARAGUAIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PONTE BRANCA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PONTES E LACERDA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PORTO ALEGRE DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PORTO DOS GAÚCHOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PORTO ESPERIDIÃO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PORTO ESTRELA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'POXORÉU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PRIMAVERA DO LESTE', prioridade_espacial: 'DEMAIS' },
                { name: 'QUERÊNCIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RESERVA DO CABAÇAL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RIBEIRÃO CASCALHEIRA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RIBEIRÃOZINHO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RIO BRANCO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RONDOLÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RONDONÓPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ROSÁRIO OESTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SALTO DO CÉU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTA CARMEM', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTA CRUZ DO XINGU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTA RITA DO TRIVELATO', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTA TEREZINHA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTO AFONSO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTO ANTÔNIO DO LESTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SANTO ANTÔNIO DO LEVERGER', prioridade_espacial: 'DEMAIS' },
                { name: 'SÃO FÉLIX DO ARAGUAIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO JOSÉ DO POVO', prioridade_espacial: 'DEMAIS' },
                { name: 'SÃO JOSÉ DO RIO CLARO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO JOSÉ DO XINGU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO JOSÉ DOS QUATRO MARCOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SÃO PEDRO DA CIPA', prioridade_espacial: 'DEMAIS' },
                { name: 'SAPEZAL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SERRA NOVA DOURADA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SINOP', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SORRISO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TABAPORÃ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TANGARÁ DA SERRA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TAPURAH', prioridade_espacial: 'DEMAIS' },
                { name: 'TERRA NOVA DO NORTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TESOURO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TORIXORÉU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'UNIÃO DO SUL', prioridade_espacial: 'DEMAIS' },
                { name: 'VALE DE SÃO DOMINGOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'VÁRZEA GRANDE', prioridade_espacial: 'DEMAIS' },
                { name: 'VERA', prioridade_espacial: 'DEMAIS' },
                { name: 'VILA BELA DA SANTÍSSIMA TRINDADE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'VILA RICA', prioridade_espacial: 'PRIORITÁRIA' }
            ],
            'MS': [
                { name: 'ÁGUA CLARA', prioridade_espacial: 'DEMAIS' },
                { name: 'ALCINÓPOLIS', prioridade_espacial: 'DEMAIS' },
                { name: 'AMAMBAI', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ANASTÁCIO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ANAURILÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ANGÉLICA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ANTÔNIO JOÃO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'APARECIDA DO TABOADO', prioridade_espacial: 'DEMAIS' },
                { name: 'AQUIDAUANA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ARAL MOREIRA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BANDEIRANTES', prioridade_espacial: 'DEMAIS' },
                { name: 'BATAGUASSU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BATAYPORÃ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BELA VISTA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BODOQUENA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BONITO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'BRASILÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'CAARAPÓ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CAMAPUÃ', prioridade_espacial: 'DEMAIS' },
                { name: 'CAMPO GRANDE', prioridade_espacial: 'DEMAIS' },
                { name: 'CARACOL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CASSILÂNDIA', prioridade_espacial: 'DEMAIS' },
                { name: 'CHAPADÃO DO SUL', prioridade_espacial: 'DEMAIS' },
                { name: 'CORGUINHO', prioridade_espacial: 'DEMAIS' },
                { name: 'CORONEL SAPUCAIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'CORUMBÁ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'COSTA RICA', prioridade_espacial: 'DEMAIS' },
                { name: 'COXIM', prioridade_espacial: 'DEMAIS' },
                { name: 'DEODÁPOLIS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'DOIS IRMÃOS DO BURITI', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'DOURADINA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'DOURADOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ELDORADO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'FÁTIMA DO SUL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'FIGUEIRÃO', prioridade_espacial: 'DEMAIS' },
                { name: 'GLÓRIA DE DOURADOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'GUIA LOPES DA LAGUNA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'IGUATEMI', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'INOCÊNCIA', prioridade_espacial: 'DEMAIS' },
                { name: 'ITAPORÃ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'ITAQUIRAÍ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'IVINHEMA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JAPORÃ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JARAGUARI', prioridade_espacial: 'DEMAIS' },
                { name: 'JARDIM', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JATEÍ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'JUTI', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'LADÁRIO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'LAGUNA CARAPÃ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MARACAJU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MIRANDA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'MUNDO NOVO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NAVIRAÍ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NIOAQUE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA ALVORADA DO SUL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVA ANDRADINA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'NOVO HORIZONTE DO SUL', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PARAÍSO DAS ÁGUAS', prioridade_espacial: 'DEMAIS' },
                { name: 'PARANAÍBA', prioridade_espacial: 'DEMAIS' },
                { name: 'PARANHOS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PEDRO GOMES', prioridade_espacial: 'DEMAIS' },
                { name: 'PONTA PORÃ', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'PORTO MURTINHO', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RIBAS DO RIO PARDO', prioridade_espacial: 'DEMAIS' },
                { name: 'RIO BRILHANTE', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'RIO NEGRO', prioridade_espacial: 'DEMAIS' },
                { name: 'RIO VERDE DE MATO GROSSO', prioridade_espacial: 'DEMAIS' },
                { name: 'ROCHEDO', prioridade_espacial: 'DEMAIS' },
                { name: 'SANTA RITA DO PARDO', prioridade_espacial: 'DEMAIS' },
                { name: 'SÃO GABRIEL DO OESTE', prioridade_espacial: 'DEMAIS' },
                { name: 'SELVÍRIA', prioridade_espacial: 'DEMAIS' },
                { name: 'SETE QUEDAS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SIDROLÂNDIA', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'SONORA', prioridade_espacial: 'DEMAIS' },
                { name: 'TACURU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TAQUARUSSU', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'TERENOS', prioridade_espacial: 'DEMAIS' },
                { name: 'TRÊS LAGOAS', prioridade_espacial: 'PRIORITÁRIA' },
                { name: 'VICENTINA', prioridade_espacial: 'PRIORITÁRIA' }
            ]
        };
    }

    render() {
        const formContainer = document.getElementById('form-component');
        
        formContainer.innerHTML = `
            <div class="projeto-panel">
                <h2 class="panel-title">⚙️ Dados do Projeto</h2>
                <form id="simulatorForm">
                    <div class="projeto-horizontal">
                        ${this.renderLocationCard()}
                        ${this.renderInvestmentCard()}
                        ${this.renderFinancingCard()}
                        ${this.renderActionsCard()}
                    </div>
                </form>
            </div>
        `;

        this.setupEventListeners();
        this.setupInputMasks();
        this.setDefaultValues();
    }

    renderLocationCard() {
        return `
            <div class="projeto-card">
                <div class="section-title">
                    📍 Localização e Tipo
                </div>
                <div class="form-group required">
                    <label for="state">
                        <span class="icon-fallback">🏛️</span> Estado
                    </label>
                    <select id="state">
                        <option value="">Selecione</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="GO">Goiás</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                    </select>
                </div>
                <div class="form-group required">
                    <label for="municipality">
                        <span class="icon-fallback">🏙️</span> Município
                    </label>
                    <select id="municipality">
                        <option value="">Selecione o estado primeiro</option>
                    </select>
                </div>
                <div class="form-group required">
                    <label for="projectSector">
                        <span class="icon-fallback">💼</span> Setor do Projeto
                    </label>
                    <select id="projectSector">
                        <option value="">Selecione o setor</option>
                        ${this.renderSectorOptions()}
                    </select>
                </div>
            </div>
        `;
    }

    renderSectorOptions() {
        return `
            <optgroup label="💧 SANEAMENTO → Limite: 80% Prioritária | 70% Demais (FP: A/C - até 20 anos)">
                <option value="infraestrutura_saneamento_III">Saneamento Básico - Abastecimento de Água e Esgotamento Sanitário [80%/70%]</option>
            </optgroup>

            <optgroup label="🚛 INFRAESTRUTURA → Limite: 60% Prioritária | 50% Demais (FP: B/D - até 20 anos)">
                <option value="infraestrutura_transportes_I">Transportes: Rodovias, Ferrovias, Hidrovias e Aeroportos [60%/50%]</option>
                <option value="infraestrutura_armazenagem_II">Armazenagem - Unidades Coletora, Intermediária e Terminal [60%/50%]</option>
                <option value="infraestrutura_residuos_IV">Usinas de Compostagem/Aterros Sanitários e Tratamento de Resíduos [60%/50%]</option>
                <option value="infraestrutura_gas_V">Produção e Distribuição de Gás e Gasoduto [60%/50%]</option>
                <option value="infraestrutura_petroleo_VI">Produção, Refino e Distribuição de Petróleo e Biocombustíveis [60%/50%]</option>
                <option value="infraestrutura_logistica_VII">Atividades de Logística - Armazenagem e Centros de Distribuição [60%/50%]</option>
                <option value="infraestrutura_telecomunicacoes_VIII">Telecomunicações [60%/50%]</option>
                <option value="infraestrutura_energia_X">Geração, Transmissão e Distribuição de Energia [60%/50%]</option>
                <option value="infraestrutura_urbana_XI">Infraestrutura Urbana - Centros Administrativos Públicos [60%/50%]</option>
                <option value="infraestrutura_portuaria_IX">Infraestrutura Portuária e Aeroportuária, Inclusive Portos Secos [60%/50%]</option>
            </optgroup>

            <optgroup label="🛳️ ESTRUTURADOR → Limite: 55% Prioritária | 45% Demais (FP: B/D - até 20 anos)">
                <option value="infraestrutura_estruturador">Estruturador [55%/45%]</option>
            </optgroup>

            <optgroup label="🏛️ SERVIÇOS PÚBLICOS → Limite: 60% Prioritária | 50% Demais (FP: B/D - até 12 anos)">
                <option value="servicos_publicos">Serviços Públicos [60%/50%]</option>
                <option value="servicos_turismo_I">Turismo - Empreendimentos Hoteleiros e Centros de Convenções [60%/50%]</option>
                <option value="servicos_hospitalares_II">Serviços Hospitalares, Ambulatoriais e de Diagnósticos [60%/50%]</option>
                <option value="servicos_transporte_passageiros_III">Transporte Regional de Passageiros [60%/50%]</option>
                <option value="servicos_educacionais_IV">Empreendimentos Educacionais e Profissionalizantes [60%/50%]</option>
            </optgroup>

            <optgroup label="🌾 TRADICIONAIS → Limite: 50% Prioritária | 40% Demais (FP: B/D - até 12 anos)">
                <option value="tradicionais_agricultura_I">Agricultura, Agronegócio, Fruticultura e Florestamento [50%/40%]</option>
                <option value="tradicionais_veiculos_II">Cadeia Produtiva de Veículos Automotores [50%/40%]</option>
                <option value="tradicionais_couros_III_a">Indústria - Couros, Peles, Calçados e Artefatos [50%/40%]</option>
                <option value="tradicionais_plasticos_III_b">Indústria - Plásticos e Seus Derivados [50%/40%]</option>
                <option value="tradicionais_latex_III_c">Indústria - Látex e Seus Derivados [50%/40%]</option>
                <option value="tradicionais_textil_III_d">Indústria - Têxtil e Artigos de Vestuário [50%/40%]</option>
                <option value="tradicionais_maquinas_III_e">Indústria - Máquinas, Ferramentas e Automação Industrial [50%/40%]</option>
                <option value="tradicionais_minerais_III_f">Indústria - Minerais, Metalurgia, Siderurgia e Mecânica [50%/40%]</option>
                <option value="tradicionais_quimicos_III_g">Indústria - Químicos e Petroquímicos [50%/40%]</option>
                <option value="tradicionais_moveis_madeira_III_h">Indústria - Móveis e Artefatos de Madeira Sustentável [50%/40%]</option>
                <option value="tradicionais_alimentos_III_i">Indústria - Alimentos, Carnes e Bebidas [50%/40%]</option>
                <option value="tradicionais_papel_III_j">Indústria - Papel, Celulose e Madeira [50%/40%]</option>
                <option value="tradicionais_farmaceuticos_III_k">Indústria - Farmacêuticos e Veterinários [50%/40%]</option>
                <option value="tradicionais_produtos_higiene_III_l">Indústria - Produtos de Higiene, Perfumaria e Cosméticos [50%/40%]</option>
            </optgroup>

            <optgroup label="🔬 CIÊNCIA, TECNOLOGIA E INOVAÇÃO → Limite: 50% Prioritária | 40% Demais (FP: B/D - até 12 anos)">
                <option value="cti_pesquisa_I">Pesquisa, Desenvolvimento e Inovação [50%/40%]</option>
                <option value="cti_desenvolvimento_II">Desenvolvimento de Software e Aplicativos [50%/40%]</option>
                <option value="cti_inovacao_III">Inovação e Empreendedorismo Tecnológico [50%/40%]</option>
            </optgroup>
        `;
    }

    renderInvestmentCard() {
        return `
            <div class="projeto-card">
                <div class="section-title">
                    💰 Valores do Investimento
                </div>
                <div class="form-group required">
                    <label for="totalInvestment">
                        <span class="icon-fallback">💵</span> Investimento Total
                    </label>
                    <div class="input-group">
                        <span class="input-prefix">R$</span>
                        <input type="text" id="totalInvestment" placeholder="0,00" data-type="currency">
                    </div>
                    <div id="totalInvestmentHint" style="margin-top: 8px; font-size: 0.8rem; line-height: 1.3;"></div>
                </div>
                
                <div class="form-group required">
                    <label for="fixedInvestment">
                        <span class="icon-fallback">🏗️</span> Investimento Fixo
                    </label>
                    <div class="input-group">
                        <span class="input-prefix">R$</span>
                        <input type="text" id="fixedInvestment" placeholder="0,00" data-type="currency">
                    </div>
                    <div id="fixedInvestmentHint" style="margin-top: 8px; font-size: 0.8rem; line-height: 1.3;"></div>
                    <div style="margin-top: 10px; padding: 10px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                        <strong style="color: #856404;">⚠️ Importante:</strong>
                        <span style="color: #856404; font-size: 0.85rem;"> FDCO NÃO FINANCIA INVESTIMENTO CIRCULANTE (CAPITAL DE GIRO)!</span>
                    </div>
                </div>

                <div class="form-group required">
                    <label for="ownResources">
                        <span class="icon-fallback">💼</span> Recursos Próprios (%)
                    </label>
                    <input type="number" id="ownResources" value="20" min="20" max="100" step="1" data-type="percentage" data-min="20" data-max="100">
                    <div id="ownResourcesHint" style="margin-top: 8px; font-size: 0.8rem; line-height: 1.3;"></div>
                </div>
            </div>
        `;
    }

    renderFinancingCard() {
        return `
            <div class="projeto-card">
                <div class="section-title">
                    📅 Condições do Financiamento
                </div>
                <div class="form-group required">
                    <label for="loanTerm">
                        <span class="icon-fallback">⏰</span> Prazo Total
                    </label>
                    <select id="loanTerm">
                        <option value="">Selecione o prazo</option>
                        <option value="5">5 anos</option>
                        <option value="8">8 anos</option>
                        <option value="10">10 anos</option>
                        <option value="12">12 anos</option>
                        <option value="15">15 anos</option>
                        <option value="20">20 anos</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="gracePeriod">
                        <span class="icon-fallback">⏸️</span> Carência
                    </label>
                    <select id="gracePeriod">
                        <option value="0">Sem carência</option>
                        <option value="0.5">6 meses</option>
                        <option value="1">1 ano</option>
                    </select>
                </div>
            </div>
        `;
    }

    renderActionsCard() {
        return `
            <div class="projeto-card">
                <div class="section-title">
                    ▶️ Ações
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    <button type="button" class="btn-primary" onclick="calculateResults()" style="width: 80%; max-width: 250px;">
                        🧮 Calcular FDCO
                    </button>
                    <button type="button" class="btn-secondary" onclick="clearForm()" style="width: 80%; max-width: 250px;">
                        🗑️ Limpar
                    </button>
                    <button type="button" class="btn-secondary" onclick="showMunicipalityStats()" style="width: 80%; max-width: 250px;">
                        📈 Estatísticas
                    </button>
                </div>
                
                <div style="margin-top: 15px; padding: 10px; background: #e7f3ff; border-radius: 6px; font-size: 0.8rem; color: #1976d2;">
                    💡 <strong>Dica:</strong> Preencha todos os campos obrigatórios (*) para obter a simulação completa do financiamento FDCO.
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Estado
        document.getElementById('state').addEventListener('change', () => {
            this.updateMunicipalities();
            this.triggerValidations();
        });

        // Município
        document.getElementById('municipality').addEventListener('change', () => {
            this.triggerValidations();
        });

        // Setor do projeto
        document.getElementById('projectSector').addEventListener('change', () => {
            this.updateLoanTermOptions();
            this.triggerValidations();
        });

        // Inputs de valores
        document.getElementById('totalInvestment').addEventListener('input', () => {
            this.triggerValidations();
        });

        document.getElementById('fixedInvestment').addEventListener('input', () => {
            this.triggerValidations();
        });

        // Recursos próprios
        document.getElementById('ownResources').addEventListener('input', () => {
            validatorService.validateOwnResources();
        });
    }

    setupInputMasks() {
        // Configurar inputs de moeda
        const totalInvestmentInput = document.getElementById('totalInvestment');
        const fixedInvestmentInput = document.getElementById('fixedInvestment');
        
        formatterService.setupCurrencyInput(totalInvestmentInput);
        formatterService.setupCurrencyInput(fixedInvestmentInput);

        // Configurar input de percentual
        const ownResourcesInput = document.getElementById('ownResources');
        formatterService.setupPercentageInput(ownResourcesInput, 20, 100);

        // Grace period é um select, não precisa de configuração especial
    }

    setDefaultValues() {
        document.getElementById('totalInvestment').value = '20.000.000,00';
        document.getElementById('fixedInvestment').value = '16.000.000,00';
        document.getElementById('ownResources').value = '20';
        document.getElementById('gracePeriod').value = '0';
    }

    updateMunicipalities() {
        const state = document.getElementById('state').value;
        const municipalitySelect = document.getElementById('municipality');
        
        municipalitySelect.innerHTML = '<option value="">Selecione o município</option>';
        
        if (state && this.municipalityData[state]) {
            const sortedMunicipalities = [...this.municipalityData[state]].sort((a, b) => a.name.localeCompare(b.name));
            
            sortedMunicipalities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.name;
                const classificacao = city.prioridade_espacial === 'PRIORITÁRIA' ? 'PRIORITÁRIA' : 'DEMAIS';
                option.textContent = `${city.name} (${classificacao})`;
                municipalitySelect.appendChild(option);
            });
        }
    }

    updateLoanTermOptions() {
        const projectSector = document.getElementById('projectSector').value;
        const loanTermSelect = document.getElementById('loanTerm');
        
        const currentValue = loanTermSelect.value;
        loanTermSelect.innerHTML = '<option value="">Selecione o prazo</option>';
        
        const isInfrastructure = projectSector.startsWith('infraestrutura_');
        const maxYears = isInfrastructure ? 20 : 12;
        
        const availableTerms = [5, 8, 10, 12, 15, 20];
        availableTerms.forEach(years => {
            if (years <= maxYears) {
                const option = document.createElement('option');
                option.value = years;
                option.textContent = `${years} anos`;
                loanTermSelect.appendChild(option);
            }
        });
        
        if (currentValue && parseInt(currentValue) <= maxYears) {
            loanTermSelect.value = currentValue;
        }
    }

    triggerValidations() {
        validatorService.triggerValidations();
    }

    calculate() {
        calculatorService.calculateResults();
    }

    clear() {
        document.getElementById('simulatorForm').reset();
        document.getElementById('municipality').innerHTML = '<option value="">Primeiro selecione o estado</option>';
        
        this.setDefaultValues();
        
        // Limpar resultados
        const resultsDiv = document.getElementById('simulationResults');
        if (resultsDiv) {
            resultsDiv.style.display = 'none';
        }
        
        const placeholder = document.getElementById('resultsPlaceholder');
        if (placeholder) {
            placeholder.style.display = 'block';
        }
        
        const statusDiv = document.getElementById('approvalStatus');
        if (statusDiv) {
            statusDiv.style.display = 'none';
        }

        // Limpar validações
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });

        // Limpar hints
        const hints = document.querySelectorAll('[id$="Hint"]');
        hints.forEach(hint => {
            hint.innerHTML = '';
        });
    }

    // Métodos utilitários
    getMunicipalityInfo(state, municipalityName) {
        if (!state || !municipalityName || !this.municipalityData[state]) {
            return null;
        }
        
        return this.municipalityData[state].find(city => 
            city.name.toUpperCase() === municipalityName.toUpperCase()
        );
    }

    getFatorPrograma(projectSector, municipalityInfo) {
        if (!projectSector || !municipalityInfo) return null;
        const isPrioritaria = municipalityInfo.prioridade_espacial === 'PRIORITÁRIA';
        
        if (projectSector === 'infraestrutura_saneamento_III') {
            return isPrioritaria ? 'A' : 'C';
        }
        
        if (projectSector.startsWith('infraestrutura_') ||
            projectSector.startsWith('servicos_') ||
            projectSector.startsWith('tradicionais_') || 
            projectSector.startsWith('cti_')) {
            return isPrioritaria ? 'B' : 'D';
        }
        
        return null;
    }

    showMunicipalityStats() {
        const stats = {
            DF: this.municipalityData['DF'].length,
            GO: this.municipalityData['GO'].length,
            MT: this.municipalityData['MT'].length,
            MS: this.municipalityData['MS'].length
        };
        
        const total = stats.DF + stats.GO + stats.MT + stats.MS;
        
        let prioritarias = 0;
        let demais = 0;
        let altaRenda = 0;
        let mediaBaixaRenda = 0;
        
        Object.values(this.municipalityData).forEach(stateData => {
            stateData.forEach(city => {
                if (city.prioridade_espacial === 'PRIORITÁRIA') {
                    prioritarias++;
                    // Verificar se é de Alta Renda
                    if (this.municipiosPrioritariosAltaRenda.includes(city.name.toUpperCase())) {
                        altaRenda++;
                    } else {
                        mediaBaixaRenda++;
                    }
                } else {
                    demais++;
                    // Todos os DEMAIS são considerados Alta Renda para o limite de R$ 20 mi
                    altaRenda++;
                }
            });
        });
        
        // Criar modal para mostrar as estatísticas
        const modal = document.createElement('div');
        modal.id = 'statsModal';
        modal.style.cssText = `
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100%; 
            background: rgba(0,0,0,0.5); 
            z-index: 10000; 
            display: flex; 
            align-items: center; 
            justify-content: center;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 15px; padding: 30px; max-width: 600px; width: 90%; max-height: 80%; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                <div style="text-align: center; margin-bottom: 25px;">
                    <h2 style="color: #2c3e50; margin-bottom: 10px;">📊 ESTATÍSTICAS DOS MUNICÍPIOS FDCO</h2>
                    <p style="color: #7f8c8d;">Superintendência do Desenvolvimento do Centro-Oeste</p>
                </div>
                
                <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                    <h3 style="color: #2c3e50; margin-bottom: 15px;">📍 Municípios por Estado</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div>• <strong>Distrito Federal:</strong> ${stats.DF} município</div>
                        <div>• <strong>Goiás:</strong> ${stats.GO} municípios</div>
                        <div>• <strong>Mato Grosso:</strong> ${stats.MT} municípios</div>
                        <div>• <strong>Mato Grosso do Sul:</strong> ${stats.MS} municípios</div>
                    </div>
                    <div style="text-align: center; margin-top: 15px; font-size: 1.2rem; font-weight: bold; color: #27ae60;">
                        🏆 Total: ${total} municípios
                    </div>
                </div>
                
                <div style="background: #e8f5e8; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                    <h3 style="color: #2c3e50; margin-bottom: 15px;">🎯 Classificação por Prioridade Espacial</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div>• <strong>PRIORITÁRIOS:</strong> ${prioritarias} municípios</div>
                        <div>• <strong>DEMAIS:</strong> ${demais} municípios</div>
                    </div>
                </div>
                
                <div style="background: #fff3cd; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                    <h3 style="color: #2c3e50; margin-bottom: 15px;">💰 Classificação por Renda (para limites mínimos)</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div>• <strong>Alta Renda:</strong> ${altaRenda} municípios<br><small style="color: #856404;">(Limite: R$ 20 milhões)</small></div>
                        <div>• <strong>Média/Baixa Renda:</strong> ${mediaBaixaRenda} municípios<br><small style="color: #856404;">(Limite: R$ 15 milhões)</small></div>
                    </div>
                    <div style="margin-top: 10px; font-size: 0.9rem; color: #856404;">
                        <strong>Exceção:</strong> Serviços Hospitalares sempre R$ 15 milhões (qualquer tipologia)
                    </div>
                </div>
                
                <div style="background: #d1ecf1; border-radius: 10px; padding: 15px; margin-bottom: 20px;">
                    <div style="font-size: 0.9rem; color: #0c5460;">
                        🎉 <strong>Status:</strong> Base Completa - Todos os Municípios Incluídos
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <button id="closeStatsModal" style="background: #3498db; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-size: 1rem; cursor: pointer; transition: all 0.3s ease;">
                        ✅ Fechar
                    </button>
                </div>
            </div>
        `;
        
        // Função para fechar o modal
        const closeModal = () => {
            const modalElement = document.getElementById('statsModal');
            if (modalElement) {
                modalElement.remove();
            }
        };
        
        // Adicionar modal ao corpo da página
        document.body.appendChild(modal);
        
        // Event listeners para fechar o modal
        document.getElementById('closeStatsModal').addEventListener('click', closeModal);
        
        // Fechar clicando no fundo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Fechar com ESC
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
}

// Instância global
const formComponent = new FormComponent();

// Funções globais para compatibilidade
window.updateMunicipalities = () => formComponent.updateMunicipalities();
window.updateLoanTermOptions = () => formComponent.updateLoanTermOptions();
window.clearForm = () => formComponent.clear();
window.showMunicipalityStats = () => formComponent.showMunicipalityStats();
// Função getMunicipalityInfo global direta
function getMunicipalityInfo(state, municipalityName) {
    return formComponent.getMunicipalityInfo(state, municipalityName);
}

window.getMunicipalityInfo = getMunicipalityInfo;
window.getFatorPrograma = (projectSector, municipalityInfo) => formComponent.getFatorPrograma(projectSector, municipalityInfo);

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    formComponent.render();
});