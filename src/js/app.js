var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.App = {
        web3Provider: null,
        contracts: {},
        petList:[],
        init: function() {
            $http.get('../pets.json', {method: 'GET'}).then(
                function (response) {
                // 请求成功执行代码
                    console.log(response);
                    if(yjys.isEmpty(response)||yjys.isEmpty(response.data)){
                        return;
                    }else {
                        $scope.App.petList = response.data;
                    }
                }
            );
            return $scope.App.initWeb3();
        },

        initWeb3: function() {
            if (typeof window.web3 !== 'undefined') {
                $scope.App.web3Provider = window.web3.currentProvider;
            } else {
                // If no injected web3 instance is detected, fall back to Ganache
                $scope.App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
            }
            window.web3 = new Web3($scope.App.web3Provider);
            // var coinbase=web3.eth.coinbase;
            // var balance=web3.eth.getBalance(coinbase);
            return $scope.App.initContract();
        },

        initContract: function() {
            $http.get('Adoption.json', {method: 'GET'}).then(
                function (resp) {
                    if(yjys.isEmpty(resp)||yjys.isEmpty(resp.data)){
                        return;
                    }else {
                            // Get the necessary contract artifact file and instantiate it with truffle-contract
                            var AdoptionArtifact = resp.data;
                            $scope.App.contracts.Adoption = TruffleContract(AdoptionArtifact);

                            // Set the provider for our contract
                            $scope.App.contracts.Adoption.setProvider($scope.App.web3Provider);
                            // Use our contract to retrieve and mark the adopted pets
                            //return App.markAdopted();
                    }
                },function(resp){
                }
            );
            return $scope.App.bindEvents();
        },

        bindEvents: function() {
        },

        web3Login:function(){

        },

        markAdopted: function(adopters, account,petid) {
            for(var i in $scope.App.petList){
                var tmp = $scope.App.petList[i];
                if(tmp.id == petid){
                    $scope.$apply(function () {
                        $scope.App.petList[i].owner = account;
                    });
                    return;
                }
            }
            return;
        },

        handleAdopt: function(pet) {
            var petId = pet.id;
            var owner = pet.owner;
            var adoptionInstance;
            var eth = 1000000000000000000;
            window.web3.eth.getAccounts(function(error, accounts) {
                if (error) {
                    console.log(error);
                }
                var account = accounts[0];
                $scope.App.contracts.Adoption.deployed().
                then(function(instance) {
                    adoptionInstance = instance;
                    return adoptionInstance.adopt(petId,owner, {from: account,value:1*eth,to:owner});
                }).then(function(result) {
                    return $scope.App.markAdopted(null,account,petId);
                }).catch(function(err) {
                    console.log(err.message);
                });
            });
        }

    };

    $scope.fishSturct = {
        //  5
        "HeadWear": [
          '<g id="Headwear_1_" >'+
      				'<linearGradient id="HeadwearLine2_2_" gradientUnits="userSpaceOnUse" x1="788.7188" y1="1188.3345" x2="1041.5741" y2="1042.3484">'+
      				'<stop  offset="0" style="stop-color:#F2EB44"/>'+
      				'<stop  offset="0.102" style="stop-color:#D4A51E"/>'+
      				'<stop  offset="0.3214" style="stop-color:#E2C429"/>'+
      				'<stop  offset="0.5918" style="stop-color:#D4A51E"/>'+
      				'<stop  offset="0.852" style="stop-color:#F2EB44"/>'+
      			'</linearGradient>'+
      				'<path id="HeadwearLine2_1_" fill="url(#HeadwearLine2_2_)" stroke="#755223"'+
              'stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M1005,979'+
              'c0,0,37,104.667,60,177.667c-24,29-74.648,50.816-101,62.333c-58.766,25.683-131.067,44.789-136,37'+
              'c-19-30-83-156-83-156s56,14.333,111.333,30'+
              'c1.333-32.333,6.333-121.333,6.333-121.333L963,1086L1005,979z"/>'+
      				'<path id="HeadwearLine1_1_" fill="none" stroke="#755223" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M808,1213'+
              'c0,0,63.786-10.012,126-36c79-33,115-67,115-67"/>'+
      		'</g>',

          '<g id="Headwear_2_" >'+
      				'<linearGradient id="HeadwearLine2_3_" gradientUnits="userSpaceOnUse" x1="788.7188" y1="1188.3345" x2="1041.5741" y2="1042.3484">'+
      				'<stop  offset="0" style="stop-color:#E2E2E2"/>'+
      				'<stop  offset="0.102" style="stop-color:#999A9D"/>'+
      				'<stop  offset="0.3163" style="stop-color:#BBBBBB"/>'+
      				'<stop  offset="0.5969" style="stop-color:#95959D"/>'+
      				'<stop  offset="0.8571" style="stop-color:#E2E2E2"/>'+
      			'</linearGradient>'+
      				'<path id="HeadwearLine2" display="inline" fill="url(#HeadwearLine2_3_)" stroke="#231815" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M1005,979'+
              'c0,0,37,104.667,60,177.667c-24,29-74.648,50.816-101,62.333c-58.766,25.683-131.067,44.789-136,37c-19-30-83-156-83-156'+
      				's56,14.333,111.333,30c1.333-32.333,6.333-121.333,6.333-121.333L963,1086L1005,979z"/>'+
      				'<path id="HeadwearLine1" display="inline" fill="none" stroke="#231815" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
      				'M808,1213c0,0,63.786-10.012,126-36c79-33,115-67,115-67"/>'+
      		'</g>',

          '<g id="HeadWear_3_" >'+
      			'<path id="HeadWearColor_1_" display="inline" fill="#C7E3C9" d="M1054.081,1157.463c-22.758,29.984-61.912,50.468-87.755,63.083'+
      				'c-57.632,28.133-119.691,27.612-120.333,18.414c-2.529-36.259-43.225-392.526-34.133-414.264'+
      				'C836.542,840.34,1009.297,1092.29,1054.081,1157.463z"/>'+
      			'<path id="HeadWearSkinColor" display="inline" fill="#26BAED" d="M871.761,900.244c0,0,2.743,5.415-27.422,26.176'+
      				'c-20.913,14.393-30.257,18.29-30.257,18.29l-3.046-60.425c0,0,8.025-4.568,16.937-13.725'+
      				'c17.269-17.742,11.907-14.345,11.907-14.345L871.761,900.244z M903.474,940.278c0,0-8.78,13.259-37.921,38.295'+
      				'c-25.114,21.576-42.783,29.827-42.783,29.827l5.402,68.834c0,0,2.97,13.524,64.489-37.248'+
      				'c46.598-38.458,39.585-58.218,39.585-58.218L903.474,940.278z M959.281,1017.663c0,0-14.719,35.204-58.436,74.025'+
      				'c-31.356,27.844-37.183,32.093-66.672,44.846l7.479,58.737c0,0,25.557,1.652,87.006-49.205'+
      				'c52.765-43.67,57.805-89.012,57.805-89.012L959.281,1017.663z M1011.447,1091.783c0,0-6.946,33.897-44.291,77.183'+
      				'c-36.741,42.584-78.503,72.868-78.503,72.868s52.919-8.985,98.441-33.172c18.531-11.54,26.862-21.169,37.369-33.603'+
      				'c21.927-25.946,15.073-40.17,15.073-40.17L1011.447,1091.783z"/>'+
      				'<path id="HeadWearLine_1_" display="inline" fill="none" stroke="#231815" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
      				'M1054.081,1157.463c-22.758,29.984-61.912,50.468-87.755,63.083c-57.632,28.133-119.691,27.612-120.333,18.414'+
      				'c-2.529-36.259-40.167-383.313-34.133-414.264C840.181,847.527,1009.297,1092.29,1054.081,1157.463z"/>'+
      			'<path id="HeadWearFlower" display="inline" fill="#FFFFFF" stroke="#ABADB6" stroke-width="2" stroke-miterlimit="10" d="'+
      				'M744.162,900.545l-24.059-28.271l90.292-52.503L744.162,900.545z M810.374,819.861l90.292-52.502l-24.058-28.271L810.374,819.861z'+
      				 'M810.339,819.807l52.502,90.291l28.271-24.059L810.339,819.807z M810.431,819.826l-52.502-90.291l-28.271,24.06L810.431,819.826z'+
      				 'M810.347,819.841l100.97,26.72l2.979-37.001L810.347,819.841z M810.425,819.792L709.454,793.07l-2.979,37.003L810.425,819.792z'+
      				 'M810.411,819.855l26.72-100.97l-37.002-2.979L810.411,819.855z M810.36,819.776l-26.72,100.971l37.001,2.979L810.36,819.776z"/>'+
      		'</g>',

          '<g id="HeadWear_4_" >'+
              '<path id="HeadWearColor" display="inline" fill="#F7E188" stroke="#231815" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M986.333,1177.667c0.333,6-5.759,12.651-26,18.333c-19,5.333-19,4.333-33.333,3.333C898,1166,606.333,814.667,605.333,791.667'+
              'C625.667,796.333,923.333,1109.667,986.333,1177.667z"/>'+
              '<path id="HeadWearLine" display="inline" fill="none" stroke="#231815" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M930.5,1200c-6.068-23.396-8.046-23.543-12.5-51.75c-4.5-28.5-6-50.75-6-50.75 M912,1097.5c0,0,1.5,22.25,6,50.75'+
              'c4.454,28.207,6.432,28.354,12.5,51.75 M827,1010.5c2.333,18.333,1.31,17.478,7.5,45.333c4.667,21,8,33.167,17.5,54.917'+
               'M760.5,942.5c0.25,6.25,2,14.75,5.5,35.75c3.537,21.22,13,38.25,16,47.25 M702.25,881.75c0,12,0.104,10.467,1.25,24.5'+
              'c1,12.25,3.5,19.75,11.5,36.667 M649.25,829.5c-0.5,5.75-0.5,7-0.25,15c0.135,4.313,3.25,15.5,6.25,20.5"/>'+
          '</g>',

          '<g id="HeadWear_5_" >'+
              '<path id="null_1_" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M924.12,1508.09"/>'+
          '</g>'
        ],
        //  3
        "Eyelid1": [
          '<g id="Eyelid1_1_" >'+
            '<g id="EyelidColor_5_">'+
              '<defs>'+
                '<path id="EyelidMask_4_" d="M726.59,1282.172c14.986-16.789,39.429-25.807,65.191-23.235c28.498,2.845,49.63,22.34,57.689,47.791'+
                  'C821.757,1288.347,761.24,1274.49,726.59,1282.172z"/>'+
              '</defs>'+
              '<clipPath id="EyelidMask_5_">'+
                '<use xlink:href="#EyelidMask_4_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyColor_7_" x="-388.248" y="432.663" clip-path="url(#EyelidMask_5_)" fill="#57A48A" width="3335.253" height="2024.773"/>'+
            '</g>'+
              '<path id="EyelidLine_6_" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M726.59,1282.172c14.986-16.789,39.429-25.807,65.191-23.235c28.498,2.845,49.63,22.34,57.689,47.791'+
              'C821.757,1288.347,761.24,1274.49,726.59,1282.172z"/>'+
          '</g>',

          '<g id="Eyelid1_2_" >'+
            '<g id="EyelidColor_6_" display="inline">'+
              '<defs>'+
                '<path id="EyelidLine_8_" d="M856.769,1356.276c2.6-52.719-15.395-92.541-68.284-97.82c-51.2-5.11-84.17,37.452-86.771,90.169'+
                  'L856.769,1356.276z"/>'+
              '</defs>'+
              '<clipPath id="EyelidLine_9_">'+
                '<use xlink:href="#EyelidLine_8_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyColor_8_" x="-388.248" y="432.663" clip-path="url(#EyelidLine_9_)" fill="#57A48A" width="3335.253" height="2024.773"/>'+
            '</g>'+
            '<path id="EyelidLine_7_" display="inline" fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" d="'+
              'M856.769,1356.276c2.6-52.719-15.395-92.541-68.284-97.82c-51.2-5.11-84.17,37.452-86.771,90.169L856.769,1356.276z"/>'+
          '</g>',

          '<g id="Eyelid1_3_">'+
              '<path id="null_4_" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M924.12,1508.09"/>'+
          '</g>'
        ],
        //  1
        "Eye1": [
          '<g id="Eye_1_" >'+
      				'<radialGradient id="SVGID_1_" cx="778.0029" cy="1362.3057" r="85.5108" gradientTransform="matrix(0.9988 0.0493 -0.0493 0.9988 69.7616 -47.6435)" gradientUnits="userSpaceOnUse">'+
      				'<stop  offset="0.8316" style="stop-color:#FFFFFF"/>'+
      				'<stop  offset="1" style="stop-color:#C4C4C4"/>'+
      			'</radialGradient>'+
      			'<path fill="url(#SVGID_1_)" stroke="#000000" stroke-width="8" stroke-miterlimit="10" d="M856.117,1354.597'+
      				'c-2.564,51.966-38.857,92.404-81.062,90.323c-42.206-2.083-74.342-45.897-71.777-97.864c2.563-51.965,35.063-93.918,85.532-88.881'+
      				'C840.942,1263.378,858.68,1302.631,856.117,1354.597z"/>'+
      			'<g id="Eye3_2_">'+
      				'<defs>'+
      						'<ellipse id="Eye3Mask_2_" transform="matrix(0.9938 0.1112 -0.1112 0.9938 155.9658 -75.9309)" cx="758.74" cy="1360.342" rx="42.71" ry="48.06"/>'+
      				'</defs>'+
      				'<clipPath id="Eye3Mask_3_">'+
      					'<use xlink:href="#Eye3Mask_2_"  overflow="visible"/>'+
      				'</clipPath>'+
      				'<rect id="EyeColor_1_" x="642.273" y="1223.78" clip-path="url(#Eye3Mask_3_)" fill="#6E428D" width="209.062" height="209.062"/>'+
      			'</g>'+
      				'<ellipse transform="matrix(0.9938 0.1112 -0.1112 0.9938 155.9586 -75.928)" fill="#211613" cx="758.74" cy="1360.342" rx="30.488" ry="34.308"/>'+
      			'<path id="Eye1_2_" fill="#FFFFFF" d="M788.586,1338.449c0,8.193-6.639,14.832-14.828,14.832c-8.193,0-14.831-6.639-14.831-14.832'+
      				'c0-8.188,6.638-14.828,14.831-14.828C781.948,1323.621,788.586,1330.261,788.586,1338.449z"/>'+
      		'</g>'
        ],
        //  4
        "Face": [
          '<g id="Face_1_" >'+
              '<path id="Mouth_1_" display="inline" fill="#3F1708" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M924.226,1593.166c-50.291,33.087-74,56.667-130.667,88c15.333,16,97.52,31.733,136.667-14'+
              'c19.487-22.766,48.406-41.549,54.774-55.499C1001.943,1574.553,961.051,1568.938,924.226,1593.166z"/>'+
            '<g id="FaceColor_2_" display="inline">'+
              '<defs>'+
                '<path id="FaceMask_2_" d="M1035.895,1749.809c-62.895,4.191-165.228,3.858-243.228-67.142c39,1,138.833-6.667,190.333-83.667'+
                  'c0-30-75.667,49.666-256.667,21.333c-30-154.667,52.229-395.514,230.785-440.727"/>'+
              '</defs>'+
              '<clipPath id="FaceMask_5_">'+
                '<use xlink:href="#FaceMask_2_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyColor_2_" x="-369.944" y="307.706" clip-path="url(#FaceMask_5_)" fill="#57A48A" width="3931.389" height="2386.677"/>'+
            '</g>'+
              '<path id="FaceLine_1_" display="inline" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M1035.895,1749.809C973,1754,869.667,1753,791.667,1682c39,1,129.833-1,191.333-83c0-30-75,53-256,24.667'+
              'c-30-154.667,51.563-398.848,230.118-444.061"/>'+
            '<path id="moustache" display="inline" fill="#0B0203" d="M915.145,1504.15c29.036-18.778,69.836,4.811,58.235,46.676'+
              'c-5.45,19.667-26.638,57.063-73.821,55.846c-37.898-0.977-59.435-28.586-113.72,2.808c-52.209-25.394-31.662-5.462-79.694-6.423'+
              'c-27.143-0.542-38.993-33.858-43.012-48.969c-4.484-16.854,16.245-60.709,43.808-44.92c6.371,3.648,10.294,15.831,6.588,23.116'+
              'c-6.733,13.237-20.368,10.766-23.249,3.324c-2.465-6.368,3.324-10.565,6.379-11.379c-4.887,6.128,0.32,11.041,6.374,7.657'+
              'c6.48-3.622,2.955-14.364-6.961-14.372c-10.937-0.008-13.648,8.978-14.014,13.328c-2.056,24.458,34.404,40.229,55.5,17.953'+
              'c24.65-26.031,38.482-6.643,50.127,7.603c27.139-33.894,63.326-10.841,88.677,7.977c19.985,14.836,64.295,6.097,72.47-17.568'+
              'c6.099-17.658-7.153-39.257-25.712-28.472c-5.196,3.021-6.896,8.926-5.894,14.331c1.018,5.494,6.449,11.836,14.021,8.213'+
              'c4.551-2.178,4.512-13.581-7.319-13.978c11.065-8.835,29.099,7.771,12.598,23.153'+
              'C917.035,1568.223,879.316,1527.321,915.145,1504.15z"/>'+
          '</g>',

          '<g id="Face_2_">'+
              '<path id="Mouth_2_" display="inline" fill="#3F1708" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M881,1588c-44.783,40.229-93.333,58.668-131.333,49.668c30,26,90.166,35.666,131.999,26.666C1046.246,1628.927,940,1535,881,1588z"/>'+
            '<g id="FaceColor_1_" display="inline">'+
              '<defs>'+
                '<path id="FaceMask_1_" d="M1035.895,1749.809C960,1750,896,1758,772.333,1655.001C830,1669,919.5,1657.5,962,1618'+
                  'c1.333-8,11-16.5-8-31.5c-58.5,5-93,17.5-200-1.5c-97.593-17.329-227-150-221-191.999c16-38,84.667,1.333,207.333-86.667'+
                  'C829.883,1242.091,883,1223,957.118,1179.606"/>'+
              '</defs>'+
              '<clipPath id="FaceMask_6_">'+
                '<use xlink:href="#FaceMask_1_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyColor_4_" x="-369.944" y="307.706" clip-path="url(#FaceMask_6_)" fill="#57A48A" width="3931.389" height="2386.677"/>'+
            '</g>'+
              '<path id="FaceLine_2_" display="inline" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M1035.895,1749.809C991,1749.667,897.667,1773,747.667,1638.334C791,1666,905,1671,957.667,1620.333'+
              'c14-10.333,7.798-34.032-12-32.666C908.938,1590.202,824.308,1616.134,708,1570c-75.115-29.794-186.504-152.552-175-176.999'+
              'c3.71-7.884,2.305-16.693,60.667-22.667c84.667-8.667,278.667-158.667,363.451-190.728"/>'+
              '<path id="Nose" display="inline" stroke="#1A1A1A" stroke-width="2" stroke-miterlimit="10" d="M621,1388.924'+
              'c4.996-3.145,9.877-2.831,11.238-1.424c1.36,1.407,2.611,6.031-0.993,10.864c-3.091,4.145-11.236,4.03-13.454,1.423'+
              'C615.575,1397.181,616.591,1391.701,621,1388.924z"/>'+
          '</g>',

          '<g id="Face_3_">'+
              '<path id="Mouth_3_" display="inline" fill="#3F1708" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M981.667,1514.333C949,1575,883,1644,811.667,1707c15.333,16,80.336,19.375,137.333,0'+
              'C1135.15,1643.722,1014.899,1452.616,981.667,1514.333z"/>'+
              '<path id="Tooth" display="inline" fill="#FFFFFF" stroke="#221714" stroke-width="5" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M986.334,1510.333L1013,1595l-50-18l-4,54.667l-47.333-23.333l-21.333,49.999l-42.667-36.666l-26,42.666l-38-40.666L772,1664'+
              'l-53-59c0,0,58,16.667,152.667-10.666S986.334,1510.333,986.334,1510.333z M815,1711.667l2-34L861,1709l8-36l54,36.667'+
              'L942.334,1665L985,1687.667l17.333-67.333l40.667,40c0,0-40.736,53.842-102.409,72.709C871,1754.333,815,1711.667,815,1711.667z"/>'+
            '<g id="FaceColor_3_" display="inline">'+
              '<defs>'+
                '<path id="FaceMask_3_" d="M1035.895,1749.809C974,1778,814,1752,803,1710c-2-20,66,22,146-3c95.152-29.735,137.883-122.09,41-178'+
                  'c0.884,68.91-139,128.5-272.87,80.586C597.5,1433,788.809,1258.175,957.118,1179.606l145.492,341.483L1035.895,1749.809z"/>'+
              '</defs>'+
              '<clipPath id="FaceMask_7_">'+
                '<use xlink:href="#FaceMask_3_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyColor_5_" x="-366.944" y="302.706" clip-path="url(#FaceMask_7_)" fill="#57A48A" width="3931.389" height="2386.677"/>'+
            '</g>'+
              '<path id="FaceLine_4_" display="inline" fill="none" stroke="#000000" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
              'M957.118,1179.606C781.627,1258.604,597.667,1443,717.13,1609.586c175.204,52.747,283.754-37.343,272.87-80.586'+
              'c100.884,62.91,51,162-57,184c-51.021,10.393-80-2.001-121.333-10c-8.667,0.666-8.328,15.17,2.667,20.667'+
              'C929,1781.001,993.001,1759,1035.895,1749.809"/>'+
          '</g>',

          '<g id="Face_4_">'+
            '<g id="FaceColor">'+
              '<defs>'+
                '<path id="FaceMask" d="M1035.895,1749.809c-158.992,22.498-284.713-77.686-311.265-171.723'+
                  'c-35.998-127.493,82.544-314.423,231.037-398.419C973.666,1277.162,1014.115,1621.584,1035.895,1749.809z"/>'+
              '</defs>'+
              '<clipPath id="FaceMask_4_">'+
                '<use xlink:href="#FaceMask"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyColor_1_" x="-307.527" y="295.456" clip-path="url(#FaceMask_4_)" fill="#57A48A" width="3931.389" height="2386.677"/>'+
            '</g>'+
            '<path id="FaceLine" fill="none" stroke="#000000" stroke-width="8" stroke-miterlimit="10" d="M1035.895,1749.809'+
              'c-158.992,22.498-281.889-78.529-311.265-171.723c-48.973-155.36,139.416-362.816,232.489-398.479"/>'+
            '<path id="Mouth" fill="#7E3000" stroke="#000000" stroke-width="5" stroke-linecap="round" stroke-miterlimit="10" d="'+
              'M1011.576,1582.645c16,36-29,93.5-80.349,98.576c-70.695,6.988-119.651-31.576-143.317-61.91'+
              'C834.576,1635.979,955.909,1661.311,1011.576,1582.645z"/>'+
          '</g>'
        ],
        //  3
        "Eyelid2": [
          '<g id="Eyelid2_1_">'+
      			'<g id="EyelidColor_3_">'+
      				'<defs>'+
      					'<path id="EyelidMask_3_" d="M944.157,1309.055c17.664-19.79,46.476-30.419,76.843-27.388c33.591,3.353,58.5,26.333,68,56.333'+
      						'C1056.333,1316.333,985,1300,944.157,1309.055z"/>'+
      				'</defs>'+
      				'<clipPath id="EyelidMask_6_">'+
      					'<use xlink:href="#EyelidMask_3_"  overflow="visible"/>'+
      				'</clipPath>'+
      					'<rect id="BodyColor_3_" x="-369.944" y="307.706" clip-path="url(#EyelidMask_6_)" fill="#57A48A" width="3931.389" height="2386.677"/>'+
      			'</g>'+
      				'<path id="EyelidLine_3_" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
      				'M944.157,1309.055c17.664-19.79,46.476-30.419,76.843-27.388c33.591,3.353,58.5,26.333,68,56.333'+
      				'C1056.333,1316.333,985,1300,944.157,1309.055z"/>'+
      		'</g>',

      		'<g id="Eyelid2_2_">'+
      			'<g id="EyelidColor_4_" display="inline">'+
      				'<defs>'+
      					'<path id="EyelidLine_5_" d="M1097.603,1396.404c3.065-62.142-18.146-109.082-80.488-115.304'+
      						'c-60.352-6.023-99.215,44.145-102.281,106.286L1097.603,1396.404z"/>'+
      				'</defs>'+
      				'<clipPath id="EyelidLine_10_">'+
      					'<use xlink:href="#EyelidLine_5_"  overflow="visible"/>'+
      				'</clipPath>'+
      					'<rect id="BodyColor_6_" x="-369.944" y="307.706" clip-path="url(#EyelidLine_10_)" fill="#57A48A" width="3931.389" height="2386.677"/>'+
      			'</g>'+
      			'<path id="EyelidLine_4_" display="inline" fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" d="'+
      				'M1097.603,1396.404c3.065-62.142-18.146-109.082-80.488-115.304c-60.352-6.023-99.215,44.145-102.281,106.286L1097.603,1396.404z"/>'+
      		'</g>',

      		'<g id="Eyelid2_3_">'+
      				'<path id="null_3_" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="'+
      				'M924.12,1508.09"/>'+
      		'</g>'
        ],
        //  1
        "Eye2": [
          '<g id="Eye_2_">'+
      				'<radialGradient id="Eye4_3_" cx="1006.2695" cy="1392.2651" r="102.2557" gradientTransform="matrix(0.9988 0.0493 -0.0493 0.9988 69.7616 -47.6435)" gradientUnits="userSpaceOnUse">'+
      				'<stop  offset="0.8316" style="stop-color:#FFFFFF"/>'+
      				'<stop  offset="1" style="stop-color:#C4C4C4"/>'+
      			'</radialGradient>'+
      			'<path id="Eye4_1_" fill="url(#Eye4_3_)" stroke="#000000" stroke-width="8" stroke-miterlimit="10" d="M1097.603,1396.404'+
      				'c-3.066,62.143-46.466,110.499-96.936,108.01c-50.47-2.49-88.899-54.885-85.833-117.027'+
      				'c3.066-62.142,41.929-112.31,102.281-106.286C1079.457,1287.323,1100.668,1334.262,1097.603,1396.404z"/>'+
      			'<g id="Eye3_1_">'+
      				'<defs>'+
      						'<ellipse id="Eye3Mask_1_" transform="matrix(0.9938 0.1112 -0.1112 0.9938 164.6857 -104.4351)" cx="1018.656" cy="1424.273" rx="51.073" ry="57.471"/>'+
      				'</defs>'+
      				'<clipPath id="Eye3Mask_5_">'+
      					'<use xlink:href="#Eye3Mask_1_"  overflow="visible"/>'+
      				'</clipPath>'+
      				'<rect id="EyeColor" x="879.383" y="1260.97" clip-path="url(#Eye3Mask_5_)" fill="#6E428D" width="250" height="250"/>'+
      			'</g>'+
      				'<ellipse id="Eye2_1_" transform="matrix(0.9938 0.1112 -0.1112 0.9938 164.6882 -104.4364)" fill="#211613" cx="1018.656" cy="1424.273" rx="36.458" ry="41.026"/>'+
      			'<path id="Eye1_1_" fill="#FFFFFF" d="M1054.347,1398.093c0,9.797-7.938,17.736-17.731,17.736c-9.797,0-17.735-7.939-17.735-17.736'+
      				'c0-9.792,7.938-17.731,17.735-17.731C1046.408,1380.362,1054.347,1388.301,1054.347,1398.093z"/>'+
      		'</g>'
        ],
        //  1
        "Head": [
          '<g id="Head">'+
            '<g id="HeadColor">'+
              '<defs>'+
                '<path id="HeadMask" d="M1189.926,1460.094c9.163,147.354-59.606,289.715-154.031,289.715'+
                  'c-94.428,0-185.996-124.974-195.238-284.053c-8.216-141.451,51.989-295.509,160.838-295.615'+
                  'C1096.997,1170.047,1180.037,1301.037,1189.926,1460.094z"/>'+
              '</defs>'+
              '<clipPath id="HeadMask_1_">'+
                '<use xlink:href="#HeadMask"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyAllColor_1_" x="-304.861" y="311.456" clip-path="url(#HeadMask_1_)" fill="#57A48A" width="3931.388" height="2386.677"/>'+
            '</g>'+
            '<path id="HeadLine" fill="none" stroke="#221714" stroke-width="8" stroke-miterlimit="10" d="M1189.926,1460.094'+
              'c9.163,147.354-59.606,289.715-154.031,289.715c-94.428,0-185.996-124.974-195.238-284.053'+
              'c-8.216-141.451,51.989-295.509,160.838-295.615C1096.997,1170.047,1180.037,1301.037,1189.926,1460.094z"/>'+
          '</g>'
        ],
        //  3
        "PectoralFin": [
          '<g id="PectoralFin_1_" >'+
      			'<g id="PectoralFinColor" display="inline">'+
      				'<defs>'+
      					'<path id="PectoralFinMask" d="M1304.368,1668.22c26.114,5.077,131.38,46.617,165.419,110.44'+
      						'c19.611,36.764,18.19,74.735,17.7,138.51c-92.456-18.503-225.412-123.234-289.137-260.521c0,0,28.318,10.449,56.055,10.419'+
      						'C1285.923,1667.033,1304.368,1668.22,1304.368,1668.22z"/>'+
      				'</defs>'+
      				'<clipPath id="PectoralFinMask_4_">'+
      					'<use xlink:href="#PectoralFinMask"  overflow="visible"/>'+
      				'</clipPath>'+
      					'<rect id="FinAllColor_2_" x="359.145" y="438.087" clip-path="url(#PectoralFinMask_4_)" fill="#C8812A" width="2242.727" height="2218.08"/>'+
      			'</g>'+
      				'<path id="PectoralFinLine" display="inline" fill="none" stroke="#050001" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" d="'+
      				'M1387.5,1874c0,0-48-39-78.258-81.473c-38.679-54.294-77.77-126.932-77.77-126.932 M1265.937,1667.807'+
      				'c0,0,41.356,64.221,89.534,113.9c95.287,98.282,132.18,116.641,132.18,116.641 M1285.923,1667.033c0,0,27.459,29.933,77.868,69.217'+
      				'c67.482,52.571,117.408,71.766,117.408,71.766 M1198.351,1656.648c63.725,137.287,196.681,242.019,289.137,260.521'+
      				'c0.49-63.774,1.911-101.746-17.7-138.51c-34.039-63.823-139.305-105.363-165.419-110.44"/>'+
      		'</g>',

      		'<g id="PectoralFin_2_" >'+
      			'<g id="PectoralFinColor_2_" display="inline">'+
      				'<defs>'+
      					'<path id="PectoralFinMask_2_" d="M1206.922,1606.691c27.278,18.998,102.526,41.262,182.848,70.314'+
      						'c97.206,35.158,215.579,111.707,153.801,149.64c-239.226,146.88-308.098-94.97-340.696-128.888c0,0,7.911-21.921,9.58-43.945'+
      						'C1214.123,1631.784,1206.922,1606.691,1206.922,1606.691z"/>'+
      				'</defs>'+
      				'<clipPath id="PectoralFinMask_5_">'+
      					'<use xlink:href="#PectoralFinMask_2_"  overflow="visible"/>'+
      				'</clipPath>'+
      					'<rect id="FinAllColor_10_" x="359.145" y="438.087" clip-path="url(#PectoralFinMask_5_)" fill="#C8812A" width="2242.727" height="2218.08"/>'+
      			'</g>'+
      				'<path id="PectoralFinLine_2_" display="inline" fill="none" stroke="#050001" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" d="'+
      				'M1402.1,1873.55c0,0-50.352-18.068-108.719-86.812c-50.956-60.009-85.029-107.923-85.029-107.923 M1212.456,1653.813'+
      				'c0,0,89.071,93.074,156.544,139.188c90.569,61.885,116.228,63.412,116.228,63.412 M1212.27,1628.737'+
      				'c0,0,126.551,83.729,192.68,120.094c96.547,53.097,149.223,69.033,149.223,69.033 M1202.875,1697.758'+
      				'c32.598,33.918,101.47,275.768,340.696,128.888c61.777-37.933-56.596-114.481-153.801-149.64'+
      				'c-80.322-29.053-152.771-50.579-180.049-69.576"/>'+
      		'</g>',

      		'<g id="PectoralFin_3_" >'+
      			'<g id="PectoralFinColor_3_" display="inline">'+
      				'<defs>'+
      					'<path id="PectoralFinMask_3_" d="M1210.808,1625.943c26.994-27.001,34.859-38.283,98.45-79.085'+
      						'c96.409-61.858,234.034-76.077,220.305,29.052c-28.244,216.271-237.627,135.614-290.459,137.17c0,0,1.896-21.413-4.104-47.413'+
      						'C1228.993,1639.636,1210.808,1625.943,1210.808,1625.943z"/>'+
      				'</defs>'+
      				'<clipPath id="PectoralFinMask_6_">'+
      					'<use xlink:href="#PectoralFinMask_3_"  overflow="visible"/>'+
      				'</clipPath>'+
      					'<rect id="FinAllColor_12_" x="359.145" y="438.087" clip-path="url(#PectoralFinMask_6_)" fill="#C8812A" width="2242.727" height="2218.08"/>'+
      			'</g>'+
      			'<path id="PectoralFinColor2" display="inline" fill="#2D2D2D" d="M1416.99,1496.827c78.68-9.684,120.5,18.382,112.573,79.083'+
      				'c-9.999,76.561-41.896,155.09-171.896,151.757C1454.333,1720.334,1491.75,1491.695,1416.99,1496.827z"/>'+
      				'<path id="PectoralFinLine_4_" display="inline" fill="none" stroke="#050001" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" d="'+
      				'M1239.104,1713.08c50.563,2.587,278.354,79.907,291.176-146.546c4.26-75.242-84.642-86.654-173.409-47.919'+
      				'c-50.57,22.066-117.85,68.416-146.063,107.328"/>'+
      		'</g>'
        ],
        //  4
        "BodySkin": [
          '<g id="BodySkin_1_" >'+
            '<defs>'+
              '<path id="BodySkinMask_2_" d="M1447,1570c121,32,174.625,73.301,134.087,107.082c-44.998,28.499-120.59,53.518-182.991,65.997'+
                'c-134.993,26.998-272.986,10.499-331.096,1.921C936.548,1725.742,1061.937,1468.165,1447,1570z"/>'+
            '</defs>'+
            '<clipPath id="BodySkinMask_4_" display="inline">'+
              '<use xlink:href="#BodySkinMask_2_"  overflow="visible"/>'+
            '</clipPath>'+
            '<polygon id="SkinAllColor_1_" display="inline" clip-path="url(#BodySkinMask_4_)" fill="#8ECEC4" points="654.564,1202.149'+
              '2479.123,1186.942 2487.056,2139.389 662.503,2154.596 	"/>'+
          '</g>',

          '<g id="BodySkin_2_">'+
            '<defs>'+
            '<path id="BodySkinMask_1_" d="M1270,1758c-23-177,23-499-226-600.5c26.5-8,74-15.5,101-20.5c36.974,13.596,108.332,42.544,166,116'+
                'c97.224,123.841-14,346,60,498C1336,1755,1309,1756,1270,1758z M1523,1439c46.936-189.784-34-244-125-307c-86-10-72.5-3.5-116-5'+
                'c103.495,94.496,156.999,155.01,127,344c-14.922,94.012-3.5,222,18,269c36.667-10.667,30-4,76-25C1484.5,1667,1500,1532,1523,1439'+
                'z"/>'+
            '</defs>'+
            '<clipPath id="BodySkinMask_6_" display="inline">'+
              '<use xlink:href="#BodySkinMask_1_"  overflow="visible"/>'+
            '</clipPath>'+
              '<rect id="SkinSllColor" x="844.838" y="900.77" display="inline" clip-path="url(#BodySkinMask_6_)" fill="#8ECEC4" width="988.499" height="952.48"/>'+
          '</g>',

          '<g id="BodySkin_3_" >'+
            '<defs>'+
              '<path id="BodySkinMask" d="M1487.911,1393.055c0,44.295-33.383,80.199-74.56,80.199c-41.179,0-74.559-35.904-74.559-80.199'+
                'c0-44.292,33.38-80.199,74.559-80.199C1454.527,1312.856,1487.911,1348.763,1487.911,1393.055z M1493,1229.667'+
                'c-12.667,28,8.49,51.94,37.088,67.118c28.604,15.168,69.604,6.602,79.251-24.302c8.994-28.815-7.006-50.816-37.673-63.482'+
                'C1536.044,1194.287,1504.69,1203.825,1493,1229.667z M1323.5,1127c-16.981,20.083-6.768,58.24,17.315,78.606'+
                'c24.08,20.358,57.37,20.591,74.353,0.503c16.981-20.081,11.203-52.863-12.881-73.226C1379.5,1128.5,1354.5,1124.5,1323.5,1127z'+
                 'M1100.976,1150.05c4.176,16.072,39.594,39.687,77.024,29.95c32.016-8.333,55.134-34.918,58.523-52.495'+
                'c0.573-2.969-123.023,11.995-135.69,16.5C1100.419,1146.021,1100.453,1148.041,1100.976,1150.05z M1196.159,1407.486'+
                'c26.822,2.195,50.722-22.721,53.412-55.637c2.688-32.909-16.86-61.369-43.7-63.551c-26.809-2.198-50.711,22.722-53.404,55.634'+
                'C1149.785,1376.846,1169.341,1405.298,1196.159,1407.486z M1321.417,1560.032c7.983-25.705-7.24-53.252-33.976-61.557'+
                'c-26.74-8.298-54.882,5.787-62.858,31.501c-7.985,25.688,7.238,53.239,33.975,61.548'+
                'C1285.299,1599.823,1313.438,1585.728,1321.417,1560.032z M1599.824,1592.245c5.514-35.573-21.834-69.307-61.069-75.394'+
                'c-39.229-6.08-75.508,17.795-81.015,53.368c-5.521,35.549,21.834,69.29,61.063,75.377'+
                'C1558.031,1651.677,1594.311,1627.798,1599.824,1592.245z"/>'+
            '</defs>'+
            '<clipPath id="BodySkinMask_7_" display="inline">'+
              '<use xlink:href="#BodySkinMask"  overflow="visible"/>'+
            '</clipPath>'+
              '<rect id="SkinAllColor" x="638.459" y="580.823" display="inline" clip-path="url(#BodySkinMask_7_)" fill="#8ECEC4" width="2029.134" height="1955.199"/>'+
          '</g>',

          '<g id="BodySkin_4_">'+
            '<defs>'+
              '<path id="BodySkinMask_3_" d="M1173,1486c-124.231-15.217-172-253-206-305c64-24.667,162.377-41.535,201.334-46.667'+
                'C1279.667,1119.667,1358,1128,1453,1141c45.693,6.253,43,14,43,14s32.794,14.154,50.589,70.604'+
                'C1562.76,1276.9,1567.077,1367.703,1513,1409C1451.152,1456.231,1365.839,1509.62,1173,1486z"/>'+
            '</defs>'+
            '<clipPath id="BodySkinMask_5_" display="inline">'+
              '<use xlink:href="#BodySkinMask_3_"  overflow="visible"/>'+
            '</clipPath>'+
            '<polygon id="SkinAllColor_2_" display="inline" clip-path="url(#BodySkinMask_5_)" fill="#8ECEC4" points="546.754,932.379'+
              '2371.313,917.173 2379.246,1869.619 554.694,1884.826 	"/>'+
          '</g>'
        ],
        //  8
        "Tail": [
          '<g id="Tail_1_" >'+
            '<path id="TailFin_6_" display="inline" fill="#A65253" d="M2067.063,1087.611c-25.498,92.996-190.49,209.99-301.771,293.027'+
              'c-22.543,128.612,127.771,161.94,304.771,363.94c56.997-46.498,116.994-118.494,124.494-347.983'+
              'C2193.058,1227.103,2118.061,1147.608,2067.063,1087.611z"/>'+
            '<g id="TailColor_6_" display="inline">'+
              '<defs>'+
                '<path id="TailMask" d="M1539,1698c53.723-23.024,215.387-78.634,300.46-163.872c23.537-94.094,23.908-121.289-7.782-204.472'+
                  'C1717.485,1232.023,1484,1147,1484,1147L1539,1698z"/>'+
              '</defs>'+
              '<clipPath id="TailMask_12_">'+
                '<use xlink:href="#TailMask"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyAllColor_6_" x="-435.713" y="703.537" clip-path="url(#TailMask_12_)" fill="#539C85" stroke="#221714" stroke-width="8" stroke-miterlimit="10" width="3931.389" height="2386.679"/>'+
            '</g>'+
              '<path id="TailLine_6_" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="'+
              'M1543,1701c57.209-24.107,214.433-79.243,297.332-162.667c65.656,60.591,168.234,119.249,229.73,206.245'+
              'c177.772-135.076,154.492-526.474-3-656.967c-37.497,116.994-185.991,200.99-234.604,238.593C1718.57,1224.806,1484,1147,1484,1147"/>'+
          '</g>',

          '<g id="Tail_2_" >'+
            '<g id="TailColor_7_" display="inline">'+
              '<defs>'+
                '<path id="TailMask_4_" d="M1514.592,1716.081c187.49-47.998,381.742-197.746,461.076-275.08'+
                  'c-88.667-5.333-105.667-32-258.666-172.333c-81.589-74.834-219.001-114.667-219.001-114.667s40,69,52,283'+
                  'C1559.93,1614.064,1514.592,1716.081,1514.592,1716.081z"/>'+
              '</defs>'+
              '<clipPath id="TailMask_13_">'+
                '<use xlink:href="#TailMask_4_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyAllColor_16_" x="-296.713" y="272.537" clip-path="url(#TailMask_13_)" fill="#539C85" stroke="#221714" stroke-width="8" stroke-miterlimit="10" width="3931.389" height="2386.679"/>'+
            '</g>'+
            '<g id="TailFin_3_" display="inline">'+
              '<defs>'+
                '<path id="TailFinMask_3_" d="M1881.668,1520.335c131.5,101,263.773,149.071,296.832,117.665c20-19-17-139.5-102.5-144'+
                  'c50.997-26.999,106.471-143.656,73.5-209c-91.832-182-89.832,15.333-153.166,125.333'+
                  'C1963.668,1457,1947.668,1468.333,1881.668,1520.335z"/>'+
              '</defs>'+
              '<clipPath id="TailFinMask_11_">'+
              '<use xlink:href="#TailFinMask_3_"  overflow="visible"/>'+
              '</clipPath>'+
              '<polygon id="TailFinAllColor_3_" clip-path="url(#TailFinMask_11_)" fill="#AB5555" points="2370.34,2069.806 1299.302,2061.806'+
                '1299.302,743.386 2370.34,751.386 "/>'+
            '</g>'+
              '<path id="TailLine_3_" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="'+
              'M1974,1439 M1886,1523 M1504.591,1719.079c66-26,141.409-26.079,381.409-196.079c168,126,306.563,151.665,298,96'+
              'c-16-104-71-119-108-125c49.778-25.171,145-179,22-280c-41.222-33.849-56,147-124,225c-106-8-124.631-52.17-245-160'+
              'c-96-86-234.666-130-234.666-130"/>'+
          '</g>',

          '<g id="Tail_3_" >'+
            '<path id="TailFin_7_" display="inline" fill="#A65253" d="M2274.052,1275.102c-134.993,4.5-271.486,35.998-364.481,74.996'+
              'c-26.627,11.166-47.998,19.499-79.496,25.499c5.472,15.356-14.186,98.766,4.5,104.995c17.999,6,65.658,19.664,79.496,26.999'+
              'c136.063,72.123,373.48,73.496,373.48,73.496S2161.558,1558.588,2008,1417C2155.558,1312.6,2131.559,1338.099,2274.052,1275.102z"'+
              '/>'+
            '<g id="TailColor_3_" display="inline">'+
              '<defs>'+
                '<path id="TailMask_2_" d="M1541.667,1697.667c53.723-23.024,165.593-125.429,250.666-210.667c18.167-6.5,30.167-8,48.167-6'+
                  'c0.579-4.76,6.5-20,6-54.5c-0.471-32.512-7.11-47.393-7-51.5c-15.666,2.168-27.167-0.001-43.833-4'+
                  'C1662.333,1223.667,1577,1184.333,1577,1184.333L1541.667,1697.667z"/>'+
              '</defs>'+
              '<clipPath id="TailMask_14_">'+
                '<use xlink:href="#TailMask_2_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyAllColor_17_" x="-435.713" y="703.537" clip-path="url(#TailMask_14_)" fill="#539C85" stroke="#221714" stroke-width="8" stroke-miterlimit="10" width="3931.389" height="2386.679"/>'+
            '</g>'+
              '<path id="TailLine_7_" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="'+
              'M1543,1701c57.209-24.107,166.434-130.576,249.333-214c21-8,52.667-9,75.667,1c87.244,37.933,278.5,107.5,428.5,90.5'+
              'c-69-7.5-196.5-60.5-288.5-161.5c71.5-55,113-87,274-143c-221,9.667-341.575,63.773-412.334,93'+
              'c-26.14,10.797-49.999,9.334-74.666,2c-118-137-219-187-219-187"/>'+
          '</g>',

          '<g id="Tail_4_" >'+
            '<g id="TailColor_1_" display="inline">'+
              '<defs>'+
                '<path id="TailMask_3_" d="M1642,1630c22.407-14.301,112.059-4.485,137.668,14.243c79.014,57.775,63.871,57.512,143.458,99.102'+
                  'c131.08,68.494,237.993,75.031,362.39,65.908c0,0,7.546-74.262-91.354-211.352c-56.587-78.422-153.47-141.177-160.54-147.221'+
                  'c34.715-36.888,91.933-78.719,191.74-228.729c90.03-135.302,116.234-191.949,132.269-229.667c0,0-102.84-24.849-282.282,64.583'+
                  'c-96.85,48.266-137.8,103.131-229.749,179.704c-24.926,20.763-84.679,33.75-130.025,34.045'+
                  'c-42.098,0.273-73.24-42.284-73.24-42.284"/>'+
              '</defs>'+
              '<clipPath id="TailMask_5_">'+
                '<use xlink:href="#TailMask_3_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyAllColor_2_" x="-309.582" y="298.517" clip-path="url(#TailMask_5_)" fill="#539C85" stroke="#221714" stroke-width="8" stroke-miterlimit="10" width="3931.389" height="2386.678"/>'+
            '</g>'+
            '<g id="TailFin" display="inline">'+
              '<defs>'+
                '<path id="TailFinMask" d="M1751.926,1633.306c12.406,2.445,22.978,6.064,29.624,10.938'+
                  'c78.753,57.775,63.662,57.512,142.989,99.102c130.656,68.494,237.211,75.031,361.215,65.908c0,0,7.516-74.262-91.064-211.352'+
                  'c-56.393-78.422-152.965-141.177-160.013-147.221c34.604-36.888,91.637-78.719,191.123-228.729'+
                  'c89.726-135.302,115.855-191.949,131.831-229.667c0,0-102.497-24.849-281.369,64.583'+
                  'c-96.527,48.266-137.347,103.131-228.998,179.704c-18.568,15.522-56.541,26.699-93.413,31.474'+
                  'C1785.749,1365.29,1783.787,1539.29,1751.926,1633.306z"/>'+
              '</defs>'+
              '<clipPath id="TailFinMask_6_">'+
                '<use xlink:href="#TailFinMask"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="TailFinAllColor" x="1689.133" y="770.778" clip-path="url(#TailFinMask_6_)" fill="#AB5555" width="1071.038" height="1318.418"/>'+
            '</g>'+
              '<path id="TailLine" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="'+
              'M2329.13,1052.434c0,0-113.143,83.232-251.835,150.982c-178.678,87.285-310.189,110.617-310.189,110.617 M1776.391,1398.687'+
              'c204.347-25.879,334.788-114.878,454.145-181.654 M1776.391,1495.456c56.548,0,146.862,8.105,262.331-48.985 M2285.754,1809.253'+
              'c-126.307-193.189-311.313-281.857-436.2-313.398 M2086.082,1801.624c-74.42-101.697-201.851-196.285-318.984-239.354'+
              'M1806.527,1660.044c-18.436-25.498-20.778-31.66-52.461-50.322 M1642.5,1628.5c22.33-14.301,113.522-2.985,139.05,15.743'+
              'c78.753,57.775,63.662,57.512,142.989,99.102c130.656,68.494,237.211,75.031,361.215,65.908c0,0,7.516-74.262-91.064-211.352'+
              'c-56.393-78.422-152.965-141.177-160.013-147.221c34.604-36.888,91.637-78.719,191.123-228.729'+
              'c89.726-135.302,115.855-191.949,131.831-229.667c0,0-102.497-24.849-281.369,64.583'+
              'c-96.527,48.266-137.347,103.131-228.998,179.704c-24.852,20.763-84.402,33.75-129.601,34.045'+
              'c-41.964,0.273-75.329-42.284-75.329-42.284"/>'+
          '</g>',

          '<g id="Tail_5_" >'+
            '<g id="TailColor" display="inline">'+
              '<defs>'+
                '<path id="TailMask_7_" d="M1593,1675c6.93-4.44,91.754-31.682,213.465-74.344c112.142-39.309,158.774-39.963,164.374-34.713'+
                  'c20.075,18.82,27.602,24.676,57.716,40.987c71.705,38.841,199.966,56.487,268.516,51.444c0,0-0.96-42.59-57.719-116.691'+
                  'c-45.171-58.974-99.125-84.068-145.551-102.89c19.128-20.391,51.375-44.807,106.369-127.731'+
                  'c49.602-74.796,67.993-107.386,76.824-128.236c0,0-70.511-16.813-169.391,32.623c-53.359,26.682-71.045,55.54-121.711,97.87'+
                  'c-13.738,11.478-19.157,15.877-50.189,11.293c-110.417-16.312-378.933-150.805-378.933-150.805L1593,1675z"/>'+
              '</defs>'+
              '<clipPath id="TailMask_6_">'+
                '<use xlink:href="#TailMask_7_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyAllColor_4_" x="-822.186" y="-32.975" clip-path="url(#TailMask_6_)" fill="#539C85" stroke="#221714" stroke-width="8" stroke-miterlimit="10" width="4932.889" height="2994.669"/>'+
            '</g>'+
            '<g id="TailFin_1_" display="inline">'+
              '<defs>'+
                '<path id="TailFinMask_1_" d="M1924.514,1567.301c29.124-5.244,43.384-4.115,46.325-1.357'+
                  'c20.075,18.82,27.602,24.676,57.716,40.987c71.705,38.841,199.966,56.487,268.516,51.444c0,0-0.96-42.59-57.719-116.691'+
                  'c-45.171-58.974-99.125-84.068-145.551-102.89c19.128-20.391,51.375-44.807,106.369-127.731'+
                  'c49.602-74.796,67.993-107.386,76.824-128.236c0,0-70.511-16.813-169.391,32.623c-53.359,26.682-71.045,55.54-121.711,97.87'+
                  'c-7.291,6.093-12.24,10.19-19.919,12.009C2000.95,1357.235,1961.426,1532.587,1924.514,1567.301z"/>'+
              '</defs>'+
              '<clipPath id="TailFinMask_7_">'+
                '<use xlink:href="#TailFinMask_1_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="TailFinAllColor_1_" x="1725.213" y="582.805" clip-path="url(#TailFinMask_7_)" fill="#AB5555" width="1343.879" height="1654.277"/>'+
            '</g>'+
              '<path id="TailLine_1_" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="'+
              'M2257.292,1217.353c0,0-46.671,8.325-123.339,45.777c-98.773,48.25-152.239,86.998-152.239,86.998 M1974.601,1404.916'+
              'c46.426-27.604,116.691-51.444,207.032-65.247 M1965.819,1434.614c61.901-5.855,83.621-7.257,135.511,6.689 M2185.397,1653.355'+
              'c-65.247-112.927-154.306-173.287-223.345-190.721 M2087.112,1630.354c-41.139-56.221-71.105-96.617-127.569-136.769'+
              'M1970.839,1565.943c-5.854-12.548-5.858-18.405-21.749-35.969 M1592.999,1670.334c6.93-4.44,91.755-27.016,213.466-69.678'+
              'c112.142-39.309,158.774-39.963,164.374-34.713c20.075,18.82,27.602,24.676,57.716,40.987'+
              'c71.705,38.841,199.966,56.487,268.516,51.444c0,0-0.96-42.59-57.719-116.691c-45.171-58.974-99.125-84.068-145.551-102.89'+
              'c19.128-20.391,51.375-44.807,106.369-127.731c49.602-74.796,67.993-107.386,76.824-128.236c0,0-70.511-16.813-169.391,32.623'+
              'c-53.359,26.682-71.045,55.54-121.711,97.87c-13.738,11.478-19.157,15.877-50.189,11.293'+
              'c-110.417-16.312-377.933-151.805-377.933-151.805"/>'+
          '</g>',

          '<g id="Tail_6_" >'+
            '<g id="TailColor_2_" display="inline">'+
              '<defs>'+
                '<path id="TailMask_11_" d="M1511,1715c5.522-3.538,272.5-99,374-58c56.052,22.642,335,119,389.5,119c0,0-31.867-172.958-40.5-360'+
                  'c-4.5-97.5,112.625-392.127,114-418.5c-114,12.5-337,111.5-516,242.5c-51.038,37.352-268.913-63.893-268.913-63.893L1511,1715z"'+
                  '/>'+
              '</defs>'+
              '<clipPath id="TailMask_8_">'+
                '<use xlink:href="#TailMask_11_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyAllColor_5_" x="-217.471" y="292.536" clip-path="url(#TailMask_8_)" fill="#539C85" stroke="#221714" stroke-width="8" stroke-miterlimit="10" width="3931.389" height="2386.677"/>'+
            '</g>'+
            '<g id="TailFin_2_" display="inline">'+
              '<defs>'+
                '<path id="TailFinMask_2_" d="M1853.001,1646.001c6.694,2.24,25.436,8.348,31.999,10.999c56.052,22.642,335,119,389.5,119'+
                  'c0,0-31.867-172.958-40.5-360c-4.5-97.5,112.625-392.127,114-418.5c-114,12.5-337,111.5-516,242.5'+
                  'c-5.05,3.695-10.73,6.777-16.867,9.33C1881,1293,1915.906,1539.331,1853.001,1646.001z"/>'+
              '</defs>'+
              '<clipPath id="TailFinMask_8_">'+
                '<use xlink:href="#TailFinMask_2_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="TailFinAllColor_2_" x="1787.244" y="760.798" clip-path="url(#TailFinMask_8_)" fill="#AB5555" width="1071.038" height="1318.418"/>'+
            '</g>'+
              '<path id="TailLine_2_" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="'+
              'M2332.049,1049.612c0,0-149.992,49.498-272.986,104.995c-110.953,50.064-220.488,124.494-220.488,124.494 M1859.572,1316.599'+
              'c98.995-56.997,358.479-123.993,430.479-134.993 M1877.572,1373.596c52.497-16.499,326.127-56.113,367.481-44.998'+
               'M2230.054,1445.593c-103.494-25.499-283.485-9-343.482-4.5 M2248.054,1594.085c-55.498-38.998-304.485-73.496-361.482-82.496'+
               'M2269.052,1738.078c-20.998-25.499-305.984-130.494-380.98-157.492 M1956,1682.5c-31.498-17.999-60.43-38.917-84.429-56.916'+
               'M1511,1715c5.522-3.538,272.5-99,374-58c56.052,22.642,335,119,389.5,119c0,0-31.867-172.958-40.5-360'+
              'c-4.5-97.5,112.625-392.127,114-418.5c-114,12.5-337,111.5-516,242.5c-51.038,37.352-269.174-67.213-269.174-67.213"/>'+
          '</g>',

          '<g id="Tail_7_" >'+
            '<g id="TailColor_4_" display="inline">'+
              '<defs>'+
                '<path id="TailMask_19_" d="M1568,1681c2.444-1.566,61.084-37.917,82.084-57.917c70.155-66.814,112.916-155.083,216.288-157.486'+
                  'c131.593,150.816,77.896,464.049,778.938,416.318c-112.877-58.219-455.906-131.791-427.586-495.205'+
                  'c21.38-274.349,200.866-310.249,515.093-632.43c-475.316-73.585-719.555,453.363-861.141,534.315'+
                  'c-47.788,27.323-172.464-32.382-193.676-44.596c-49.497-28.499-145-79-145-79L1568,1681z"/>'+
              '</defs>'+
              '<clipPath id="TailMask_9_">'+
                '<use xlink:href="#TailMask_19_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyAllColor_8_" x="-291.498" y="304.631" clip-path="url(#TailMask_9_)" fill="#539C85" stroke="#221714" stroke-width="8" stroke-miterlimit="10" width="3909.321" height="2329.279"/>'+
            '</g>'+
            '<g id="TailFin_4_" display="inline">'+
              '<defs>'+
                '<path id="TailFinMask_4_" d="M1856.229,1464.216c4.116,0.008,7.533,0.448,10.144,1.381'+
                  'c131.593,150.816,77.896,464.049,778.938,416.318c-112.877-58.219-455.906-131.791-427.586-495.205'+
                  'c21.38-274.349,200.866-310.249,515.093-632.43c-466.85-72.274-713.945,429.485-853.646,529.287'+
                  'C1884.935,1315.777,1896.867,1415.216,1856.229,1464.216z"/>'+
              '</defs>'+
              '<clipPath id="TailFinMask_9_">'+
                '<use xlink:href="#TailFinMask_4_"  overflow="visible"/>'+
              '</clipPath>'+
              '<polygon id="TailFinAllColor_5_" clip-path="url(#TailFinMask_9_)" fill="#AB5555" points="2751.991,2032.282 1686.964,2076.282'+
                '1686.964,765.264 2751.991,721.264 		"/>'+
            '</g>'+
              '<path id="TailLine_4_" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="'+
              'M2685.111,798.156c0,0-113.386,9.821-288.397,83.406c-256.415,107.811-409.688,290.361-409.688,290.361 M1915.431,1253.462'+
              'c198.877-155.124,532.026-342.448,665.273-358.358 M1878.639,1305.17c73.585-1.988,456.959-253.458,530.543-259.424'+
               'M2256.837,1228.271c-94.799,33.146-186.281,86.843-379.193,102.753 M2226.341,1327.047'+
              'c-88.832,29.831-289.697,32.814-350.686,28.837 M2217.062,1472.228c-38.45-15.247-164.075-74.248-340.412-91.484'+
               'M2246.893,1584.925c-39.113-25.855-209.815-147.501-372.232-185.288 M2587.636,1856.724'+
              'c-25.853-5.966-135.897,29.832-298.315-87.505c-145.878-105.391-329.143-304.946-418.638-346.711 M2336.056,1875.948'+
              'c-26.849-10.938-164.074-66.624-250.585-151.146c-128.726-125.767-140.541-227.052-220.755-279.423 M1574,1683'+
              'c1.918-1.229,69.423-53.989,82.084-64.416c76.496-62.997,96.916-144.584,210.288-152.987'+
              'c131.593,150.816,77.896,464.049,778.938,416.318c-112.877-58.219-455.906-131.791-427.586-495.205'+
              'c21.38-274.349,200.866-310.249,515.093-632.43c-475.316-73.585-722.837,447.875-861.141,534.315'+
              'c-20.052,12.532-116.647-2.525-203.676-52.596c-73-42-131-73-131-73"/>'+
          '</g>',

          '<g id="Tail_8_">'+
            '<g id="TailColor_5_" display="inline">'+
              '<defs>'+
                '<path id="TailMask_1_" d="M1549.5,1693.5c34.499-17.999,57.5-24,183.756-47.499c58.436-10.876,259,17,262-47'+
                  'c4.374-93.303-121.467-198.358-125-199.001c109.563-55.403,180.739-155.912,104-196c-67-35-284.614-43.146-321-46'+
                  'c-153-12-168.165-7.391-168.165-7.391L1549.5,1693.5z"/>'+
              '</defs>'+
              '<clipPath id="TailMask_10_">'+
                '<use xlink:href="#TailMask_1_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="BodyAllColor_15_" x="-328.713" y="274.537" clip-path="url(#TailMask_10_)" fill="#539C85" stroke="#221714" stroke-width="8" stroke-miterlimit="10" width="3931.389" height="2386.679"/>'+
            '</g>'+
            '<g id="TailFin_5_" display="inline">'+
              '<defs>'+
                '<path id="TailFinMask_5_" d="M1698.256,1650.001c76.496-7.498,73.197-9.125,178.665-8.666'+
                  'c153.333,0.668,124.283-62.26,101.335-107.334c-37.335-73.334-70.001-111.334-111.542-134.226'+
                  'c50.997-26.999,112.208-73.108,137.542-141.775c24.742-67.064-168-104-348-98c34.002,19.075,82,122,94,222'+
                  'C1762.742,1486.055,1738.256,1558.001,1698.256,1650.001z"/>'+
              '</defs>'+
              '<clipPath id="TailFinMask_10_">'+
                '<use xlink:href="#TailFinMask_5_"  overflow="visible"/>'+
              '</clipPath>'+
              '<polygon id="TailFinAllColor_4_" clip-path="url(#TailFinMask_10_)" fill="#AB5555" points="2447.34,2069.806 1376.302,2061.806'+
                '1376.302,743.386 2447.34,751.386 		"/>'+
            '</g>'+
              '<path id="TailLine_5_" display="inline" fill="none" stroke="#221714" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" d="'+
              'M1551.5,1696.5c41.585-22.418,113.5-49.5,218.756-52.499c73.71-2.101,232,6,226-50c-8.547-79.768-78-164.001-126-194.001'+
              'c49.778-25.171,164.888-118.238,128-174c-44.303-66.972-295.26-65.817-328-68c-132.146-8.81-186.256-11-186.256-11"/>'+
          '</g>'
        ],
        //  1
        "Body": [
          '<g id="Body">'+
      			'<g id="BodyColor">'+
      				'<defs>'+
      					'<path id="BodyMask_1_" d="M1725.569,1434.022c12.742,173.948-171.481,300.057-387.47,324.055'+
      						'c-143.237,15.915-170.992,0.001-276.433-11.077C978.181,1678.066,889,1541,887,1433c-2.519-135.991-5-237,97-263'+
      						'c65.9-16.798,180.075-45,301-45C1524.799,1125,1708.872,1206.084,1725.569,1434.022z"/>'+
      				'</defs>'+
      				'<clipPath id="BodyMask_2_">'+
      					'<use xlink:href="#BodyMask_1_"  overflow="visible"/>'+
      				'</clipPath>'+
      					'<rect id="BodyAllColor_3_" x="-292.861" y="244.956" clip-path="url(#BodyMask_2_)" fill="#539C85" width="3931.388" height="2386.677"/>'+
      			'</g>'+
      			'<path id="BodyMask" fill="none" d="M1725.569,1434.022c10.01,169.563,25.442,333.055-429.469,333.055'+
      				'c-99.517,0-174.434-5.41-243.426-24.558C971.667,1652.333,885,1569,857.187,1434.022'+
      				'c-38.358-186.153,158.428-313.413,417.915-313.413C1514.9,1120.609,1714.369,1244.288,1725.569,1434.022z"/>'+
      			'<path id="BodyLine" fill="none" stroke="#221714" stroke-width="8" stroke-miterlimit="10" d="M1725.569,1434.022'+
      				'c5.586,163.562-164.862,319.682-433.968,327.055c-109.494,3-210.602-8.077-229.935-14.077C1023,1701,889.913,1594.033,887,1428'+
      				'c-2-114-10.253-219.836,73-250c69-25,185.067-52.12,307-55C1521,1117,1717.58,1200.106,1725.569,1434.022z"/>'+
      		'</g>'
        ],
        //  3
        "VentralFin": [
          '<g id="VentralFin_1_" >'+
            '<g id="VentralFinColor_2_" display="inline">'+
              '<defs>'+
                '<path id="VentralFinMask_2_" d="M1629.255,1581.356c-41.115,24.627-128.034,82.521-141.441,93.162'+
                  'c117.738,147.529,182.873,148.634,225.687,98.481c35-41,48.5-72-9.804-114.925'+
                  'C1665.886,1625.976,1636.365,1597.362,1629.255,1581.356z"/>'+
              '</defs>'+
              '<clipPath id="VentralFinMask_5_">'+
                '<use xlink:href="#VentralFinMask_2_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="FinAllColor_3_" x="704.063" y="596.01" clip-path="url(#VentralFinMask_5_)" fill="#C8812A" width="1725.71" height="1832.702"/>'+
            '</g>'+
            '<path id="VentralFinLine_2_" display="inline" fill="none" stroke="#050001" stroke-width="6" stroke-miterlimit="10" d="'+
              'M1622.557,1796.527c0,0-32.718-32.17-51.623-55.982c-28.452-35.841-59.322-80.126-59.322-80.126 M1538.472,1641.756'+
              'c0,0,30.345,50.489,64.528,88.244c33.5,37,78,69.5,78,69.5 M1568.696,1619.678c0,0,46.141,61.973,64.304,79.822'+
              'c29,28.5,82.5,66.5,82.5,66.5 M1600.684,1599.073c0,0,19.17,29.712,78.816,88.427c32,31.5,59.5,46.5,59.5,46.5 M1629.255,1581.356'+
              'c-41.115,24.627-128.034,82.521-141.441,93.162c117.738,147.529,186.688,152.479,225.687,98.481s45-71.5-9.804-114.925'+
              'C1665.886,1625.976,1636.365,1597.362,1629.255,1581.356z"/>'+
          '</g>',

          '<g id="VentralFin_2_" >'+
            '<g id="VentralFinColor_3_" display="inline">'+
              '<defs>'+
              '<path id="VentralFinMask_3_" d="M1647.412,1590.323c-52.412,26.677-166.391,84.849-182.736,89.929'+
                  'c14.324,72.748,238.628,127.814,299.264,109.114c7.775-2.397,35.04-29.639,7.275-87.809'+
                  'C1743.587,1643.675,1675.667,1619,1647.412,1590.323z"/>'+
              '</defs>'+
              '<clipPath id="VentralFinMask_6_">'+
                '<use xlink:href="#VentralFinMask_3_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="FinAllColor_8_" x="704.063" y="596.01" clip-path="url(#VentralFinMask_6_)" fill="#C8812A" width="1725.71" height="1832.702"/>'+
            '</g>'+
            '<path id="PectoralFinColor2_1_" display="inline" fill="#2D2D2D" d="M1771.215,1701.558C1787,1738,1782,1741,1775.667,1777'+
              'c-4.546,25.842-83.5,12-158.167-2C1681,1774,1716,1753,1771.215,1701.558z"/>'+
            '<path id="VentralFinLine_3_" display="inline" fill="none" stroke="#050001" stroke-width="6" stroke-miterlimit="10" d="'+
              'M1647.412,1590.323c-38.04,22.201-166.391,84.848-182.736,89.929c24.715,85.049,291.089,137.883,309.35,97.739'+
              'C1816.513,1684.584,1660.206,1605.287,1647.412,1590.323z"/>'+
          '</g>',

          '<g id="VentralFin_3_">'+
            '<g id="VentralFinColor">'+
              '<defs>'+
                '<path id="VentralFinMask" d="M1673.303,1514.823c-118.087,82.154-307.716,202.597-320.387,217.416'+
                  'c62.653,59.589,221.807,81.288,315.257,77.014c53.174-36.623,107.82-82.146,145.197-140.681'+
                  'C1774.825,1614.518,1716.433,1588.76,1673.303,1514.823z"/>'+
              '</defs>'+
              '<clipPath id="VentralFinMask_4_">'+
                '<use xlink:href="#VentralFinMask"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="FinAllColor_5_" x="402.216" y="418.737" clip-path="url(#VentralFinMask_4_)" fill="#C8812A" width="2242.727" height="2218.08"/>'+
            '</g>'+
            '<path id="VentralFinLine" fill="none" stroke="#221714" stroke-width="6" stroke-miterlimit="10" d="M1515.93,1797.983'+
              'c0,0-39.586-10.913-95.155-55.066c-14.435-11.466-39.243-32.321-39.243-32.321 M1417.069,1686.401'+
              'c0,0,64.152,51.763,115.444,86.121c30.926,20.71,66.949,35.705,66.949,35.705 M1454.481,1661.443c0,0,56.779,49.64,113.723,86.433'+
              'c51.663,33.382,107.588,54.898,107.588,54.898 M1494.244,1634.173c0,0,46.759,42.413,113.744,84.57'+
              'c54.735,34.44,109.456,53.795,109.456,53.795 M1527.071,1613.362c0,0,45.801,36.102,110.015,67.531'+
              'c89.71,43.915,125.815,50.431,125.815,50.431 M1566.301,1587.31c0,0,28.137,23.971,94.409,56.601'+
              'c89.978,44.295,132.255,53.315,132.255,53.315 M1599.968,1564.8c0,0,28.353,28.182,92.588,54.453'+
              'c93.057,38.05,116.979,44.123,116.979,44.123 M1634.313,1541.61c0,0,17.885,16.972,78.271,48.483'+
              'c11.239,5.865,38.774,15.953,38.774,15.953 M1673.303,1514.823c-118.087,82.154-307.716,202.597-320.387,217.416'+
              'c62.653,59.589,221.807,81.288,315.257,77.014c53.174-36.623,107.82-82.146,145.197-140.681'+
              'C1774.825,1614.518,1716.433,1588.76,1673.303,1514.823z"/>'+
          '</g>'
        ],
        //  4
        "DorsalFin": [
          '<g id="DorsalFin_1_">'+
            '<g id="DorsalFinColor_1_" display="inline">'+
              '<defs>'+
                '<path id="DorsalFinMask_1_" d="M1163.35,1207.331c-53.142,10.012-77.787,10.526-117.065,12.836'+
                  'c-40.05-70.855-100.637-277.256,21.566-297.401C1163.313,907.028,1209.561,1185.254,1163.35,1207.331z M1292.654,880.644'+
                  'c-123.092-13.712-120.68,201.387-101.323,280.442c38.437,8.413,62.299,14.596,116.166,19.352'+
                  'C1357.961,1171.704,1388.81,891.354,1292.654,880.644z M1476.396,930.816c-120.908-26.865-141.631,187.248-130.883,267.923'+
                  'c37.312,12.496,60.374,21.208,113.414,31.729C1510.041,1227.21,1570.85,951.8,1476.396,930.816z M1692.548,1074.043'+
                  'c-97.591-76.258-208.398,108.119-233.398,185.571c28.301,27.329,45.376,45.116,88.729,77.428'+
                  'C1595.418,1356.086,1768.782,1133.613,1692.548,1074.043z"/>'+
              '</defs>'+
              '<clipPath id="DorsalFinMask_5_">'+
                '<use xlink:href="#DorsalFinMask_1_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="FinAllColor_7_" x="359.145" y="441.087" clip-path="url(#DorsalFinMask_5_)" fill="#C8812A" width="2242.727" height="2218.08"/>'+
            '</g>'+
            '<path id="DorsalFinLine_1_" display="inline" fill="none" stroke="#050001" stroke-width="6" stroke-miterlimit="10" d="'+
              'M1070.545,1218.78c0,0-25.181-51.427-43.638-133.28c-15.247-67.616-19.613-117.73-19.613-117.73 M1055.348,925.685'+
              'c0,0,2.42,42.988,14.813,111.184c14.275,78.557,46.946,177.846,46.946,177.846 M1156.49,1208.595c0,0-6.339-81.837-23.176-159.405'+
              'c-14.615-67.337-28.942-117.631-28.942-117.631 M1067.851,922.766c-122.203,20.145-61.616,226.546-21.566,297.401'+
              'c39.279-2.311,63.924-2.824,117.065-12.836C1209.561,1185.254,1163.313,907.028,1067.851,922.766z M1219.358,910.99'+
              'c0,0-1.255-6.038-7.797,62.968c-7.539,79.486,4.025,192.478,4.025,192.478 M1279.832,880.06c0,0-9.321,42.042-15.864,111.045'+
              'c-7.541,79.488-2.984,183.918-2.984,183.918 M1302.167,1178.811c0,0,14.452-79.508,19.253-158.735'+
              'c4.176-68.781,4.008-121.062,4.008-121.062 M1292.654,880.644c-123.092-13.712-120.68,201.387-101.323,280.442'+
              'c38.437,8.413,62.299,14.596,116.166,19.352C1357.961,1171.704,1388.81,891.354,1292.654,880.644z M1402.979,950.436'+
              'c0,0-11.769,52.148-25.692,120.048c-16.041,78.219-9.085,135.899-9.085,135.899 M1463.379,928.828'+
              'c-21.082,64.09-14.072,43.809-27.378,108.726c-16.034,78.215-22.711,179.092-22.711,179.092 M1454.088,1227.222'+
              'c0,0,22.628-76.438,35.927-154.692c11.537-67.931,16.994-119.94,16.994-119.94 M1476.396,930.816'+
              'c-120.908-26.865-141.631,187.248-130.883,267.923c37.312,12.496,60.374,21.208,113.414,31.729'+
              'C1510.041,1227.21,1570.85,951.8,1476.396,930.816z M1614.233,1061.416c0,0-21.729,28.596-63.514,83.907'+
              'c-48.119,63.709-74.168,131.16-74.168,131.16 M1681.934,1066.823c0,0-29.989,30.895-71.767,86.202'+
              'c-48.126,63.71-99.04,154.999-99.04,154.999 M1543.457,1333.72c0,0,54.764-60.961,100.423-125.888'+
              'c39.637-56.358,67.766-102.283,67.766-102.283 M1692.548,1074.043c-97.591-76.258-208.398,108.119-233.398,185.571'+
              'c28.301,27.329,45.376,45.116,88.729,77.428C1595.418,1356.086,1768.782,1133.613,1692.548,1074.043z"/>'+
          '</g>',

          '<g id="DorsalFin_2_">'+
            '<g id="DorsalFinColor_2_" display="inline">'+
              '<defs>'+
                '<path id="DorsalFinMask_2_" d="M1732.766,1163.741c5.263,14.648-79.073,47.239,15.275,154.864'+
                  'c-627.424-158.142-636.855-93.311-644.18-96.311c-53.396-3.595-69.285-15.776-96.497-42.987'+
                  'c28.084-35.942,143.152-235.32,302.324-343.02c13.706-9.279,67.198,214.865,251.588,159.046'+
                  'C1567.943,1040.517,1558.189,1165.796,1732.766,1163.741z"/>'+
              '</defs>'+
              '<clipPath id="DorsalFinMask_6_">'+
                '<use xlink:href="#DorsalFinMask_2_"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="FinAllColor_6_" x="359.145" y="441.087" clip-path="url(#DorsalFinMask_6_)" fill="#C8812A" width="2242.727" height="2218.08"/>'+
            '</g>'+
            '<path id="DorsalFinLine_2_" display="inline" fill="none" stroke="#050001" stroke-width="6" stroke-miterlimit="10" d="'+
              'M1069.665,1218.835c0,0,47.323-101.542,123.979-196.805c79.864-99.25,139.401-148.992,139.401-148.992 M1356.896,913.286'+
              'c0,0-53.063,44.03-116.012,127.229c-67.416,89.102-109.699,172.276-109.699,172.276 M1384.947,948.873'+
              'c0,0-39.375,31.403-99.908,111.154c-60.226,79.347-98.873,151.941-98.873,151.941 M1430.938,985.365'+
              'c0,0-33.629,32.33-80.444,91.418c-49.177,62.074-91.98,141.181-91.98,141.181 M1496.312,1004.058c0,0-43.22,42.365-81.883,92.937'+
              'c-42.617,55.753-88.069,130.478-88.069,130.478 M1563.93,1021.209c0,0-30.746,23.695-88.917,97.351'+
              'c-60.227,76.265-80.788,120.63-80.788,120.63 M1578.521,1085.881c0,0-16.845,14.477-57.299,66.565'+
              'c-39.683,51.106-68.964,97.998-68.964,97.998 M1611.639,1130.554c0,0-7.545,4.518-45.443,48.582'+
              'c-32.655,37.968-63.089,81.896-63.089,81.896 M1658.168,1154.598c0,0-22.16,16.644-56.824,55.697'+
              'c-21.499,24.208-52.906,60.652-52.906,60.652 M1728.506,1164.46c0,0-36.291,25.006-85.08,69.983'+
              'c-20.591,18.98-47.428,47.314-47.428,47.314 M1704.383,1241.651c0,0-7.262,5.374-25.021,21.701'+
              'c-17.232,15.846-33.125,30.228-33.125,30.228 M1561.275,995.334c-184.39,55.818-237.882-168.326-251.588-159.046'+
              'c-159.172,107.7-274.24,307.077-302.324,343.02c27.212,27.211,43.101,39.392,96.497,42.987c7.325,3,16.756-61.831,644.18,96.311'+
              'c-94.349-107.625-10.013-140.216-15.275-154.864C1558.189,1165.796,1567.943,1040.517,1561.275,995.334z"/>'+
          '</g>',

          '<g id="DorsalFin_3_" >'+
            '<g id="DorsalFinColor_3_" display="inline">'+
              '<defs>'+
                '<path id="DorsalFinMask_3_" d="M1681,1301c-294-139-634-130-690-129.686c28.084-35.942,60.361-183.12,215-198.314'+
                  'C1247.894,968.884,1578,988,1681,1301z"/>'+
              '</defs>'+
              '<clipPath id="DorsalFinMask_7_">'+
                '<use xlink:href="#DorsalFinMask_3_"  overflow="visible"/>'+
              '</clipPath>'+
              '<rect id="FinAllColor_9_" x="359.145" y="441.087" clip-path="url(#DorsalFinMask_7_)" fill="#C8812A" width="2242.727" height="2218.08"/>'+
            '</g>'+
            '<path id="DorsalFinLine_3_" display="inline" fill="none" stroke="#050001" stroke-width="6" stroke-miterlimit="10" d="'+
              'M1039.423,1171.314c0,0,20.581-41.963,65.264-102.458c45.615-61.755,88.423-94.738,88.423-94.738 M1271.006,974.116'+
              'c0,0-49.124,40.001-85.616,93.336c-29.166,42.626-59.649,103.862-59.649,103.862 M1346.095,988.854'+
              'c0,0-37.388,36.848-77.896,94.037c-35.79,50.528-54.737,94.037-54.737,94.037 M1409.955,1013.416c0,0-35.789,34.387-68.071,80.002'+
              'c-21.974,31.049-47.02,70.878-58.247,91.931 M1472.414,1044.995c0,0-36.492,33.684-63.861,70.878'+
              'c-25.602,34.793-52.634,82.107-52.634,82.107 M1525.748,1080.083c0,0-30.176,26.667-52.634,57.544'+
              'c-24.279,33.384-46.316,75.09-46.316,75.09 M1567.854,1121.488c0,0-24.019,19.719-44.913,49.123'+
              'c-18.948,26.668-34.387,56.843-34.387,56.843 M1612.585,1164.107c0,0-23.06,21.645-39.117,39.487'+
              'c-12.631,14.036-31.579,40.001-31.579,40.001 M1644.083,1210.605c0,0-25.858,38.242-41.997,59.997 M991,1171.314'+
              'c178.951-10.527,509.09,30.292,692.081,133.786c-46.316-155.792-155.229-253.789-323.652-310.632'+
              'C1074.736,898.384,1024.685,1131.313,991,1171.314z"/>'+
          '</g>',

          '<g id="DorsalFin_4_">'+
            '<g id="DorsalFinColor_4_">'+
              '<defs>'+
                '<path id="DorsalFinMask" d="M1508.387,1045.765c6.322,14.224-74.827,25.575-153.307,57.596'+
                  'c-90.597,36.968-183.144,91.487-190.671,89.032c-53.516,0.327-70.254-10.658-99.385-35.803'+
                  'c25.374-37.902,243.366-263.071,437.683-244.261c16.477,1.594-53.197,57.039-48.236,79.222'+
                  'C1464.433,1036.125,1501.367,1029.973,1508.387,1045.765z"/>'+
              '</defs>'+
              '<clipPath id="DorsalFinMask_4_">'+
                '<use xlink:href="#DorsalFinMask"  overflow="visible"/>'+
              '</clipPath>'+
                '<rect id="FinAllColor_11_" x="359.145" y="438.087" clip-path="url(#DorsalFinMask_4_)" fill="#C8812A" width="2242.727" height="2218.08"/>'+
            '</g>'+
            '<path id="DorsalFinLine" fill="none" stroke="#050001" stroke-width="6" stroke-miterlimit="10" d="M1085.318,1172.837'+
              'c0,0,55.96-78.479,190.803-149.136c131.409-68.856,208.95-81.943,208.95-81.943 M1454.471,991.55c0,0-25.51-3.8-167.471,69.45'+
              'c-137.134,70.756-175.832,125.087-175.832,125.087 M1483.91,1030.156c0,0-42.498,0.966-138.406,40.962'+
              'c-142.424,59.394-207.643,120.247-207.643,120.247 M1454.471,991.55c-4.961-22.183,64.713-77.628,48.236-79.222'+
              'c-194.316-18.81-412.309,206.359-437.683,244.261c29.132,25.145,45.87,36.13,99.386,35.803'+
              'c7.526,2.455,100.073-52.063,190.67-89.032c78.479-32.021,159.629-43.373,153.307-57.596'+
              'C1501.367,1029.973,1464.432,1036.125,1454.471,991.55z"/>'+
          '</g>'
        ]
    };
});


app.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }]);
