const apiKey = '2fcbfbebefec6abd3f2f75b96b9383b46d3fc8a02e8f68fb052c57b644271592'; // Reemplaza con tu API Key válida de CryptoCompare

// Función para obtener los precios de BTC, LTC y DOGE en USD
async function getCryptoPrices() {
    const symbols = ['BTC', 'LTC', 'DOGE'];
    const apiUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols.join(',')}&tsyms=USD`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'authorization': `Apikey ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos de CryptoCompare');
        }

        const data = await response.json();

        localStorage.setItem('cryptoPrices', JSON.stringify(data));

    } catch (error) {
        console.error('Error:', error);
    }
}

// Llamar a la función para obtener los precios de BTC, LTC y DOGE
getCryptoPrices();



function blockAmount() {
    switch (document.getElementById("selectBlock").selectedIndex) {
        case 0:
            //LMT
            var blockreward = 0.8;
            document.getElementById("selectBlockReward").value = 0.8;
        break;
        case 1:
            //BTC
            var blockreward = 0.0000115;
            document.getElementById("selectBlockReward").value = 0.0000115;
        break;
        case 2:
            //DOGE
            var blockreward = 3.15;
            document.getElementById("selectBlockReward").value = 3.15;
        break;
        case 3:
            //LTC
            var blockreward = 0.005;
            document.getElementById("selectBlockReward").value = 0.005;
        break;
    }
}


function calcular() {

    var netpower = parseFloat(document.getElementById("inputNetworkPower").value);
    var goalpower = parseFloat(document.getElementById("inputUserPower").value);
    var blockreward = parseFloat(document.getElementById("selectBlockReward").value);

    switch (document.getElementById("selectNetworkPower").selectedIndex) {
        case 0:
            netpower *= 1000000000;
            break;
        case 1:
            netpower *= 1000000000000;
            break;
        case 2:
            netpower *= 1000000000000000;
            break;
        default:
            netpower *= 1000000000000000000;
            break;
    }

    switch (document.getElementById("selectUserPower").selectedIndex) {
        case 0:
            //GH/s
            goalpower *= 1000000000;
            break;
        case 1:
            //TH/s
            goalpower *= 1000000000000;
            break;
        case 2:
            //PH/s
            goalpower *= 1000000000000000;
            break;
        default:
            //EH/s
            goalpower *= 1000000000000000000;
            break;
    }

    var exp_reward = blockreward * (goalpower / netpower);

    let blockInput = parseFloat(document.getElementById("TimerBlockReward").value);

    const BlockTimer = blockInput * 60;

    const secFullDay = 86400;

    const dailyBlocks = secFullDay / BlockTimer;
    const cryptoPrices = JSON.parse(localStorage.getItem('cryptoPrices'));
    switch (document.getElementById("selectBlock").selectedIndex) {
        case 0:

            document.getElementById("expected").innerHTML = exp_reward.toFixed(8) + " LimerToken";
            var lmtResult = (exp_reward * dailyBlocks).toFixed(8);
            document.getElementById("daily").innerHTML = lmtResult + " LimerToken"  + "<br>" +(1 * lmtResult).toFixed(11) + " $";
            document.getElementById("weekly").innerHTML = (lmtResult * 7).toFixed(8) + " LimerToken" + "<br>" +(1 * lmtResult * 7).toFixed(11) + " $";
            document.getElementById("monthly").innerHTML = (lmtResult * 30).toFixed(8) + " LimerToken"+ "<br>" +(1 * lmtResult * 30).toFixed(11) + " $";
        break;

        case 1:
            document.getElementById("expected").innerHTML = exp_reward.toFixed(11) + " Bitcoin";
            var btcResult = (exp_reward * dailyBlocks).toFixed(11);
            document.getElementById("daily").innerHTML = btcResult + " Bitcoin" + "<br>" +(cryptoPrices.BTC.USD * btcResult).toFixed(11) + " $";
            document.getElementById("weekly").innerHTML = (btcResult * 7).toFixed(11) + " Bitcoin"+ "<br>" +(cryptoPrices.BTC.USD * btcResult * 7).toFixed(11) + " $";
            document.getElementById("monthly").innerHTML = (btcResult * 30).toFixed(11) + " Bitcoin"+ "<br>" +(cryptoPrices.BTC.USD * btcResult * 30).toFixed(11) + " $";
        break;
        case 2:
            document.getElementById("expected").innerHTML = exp_reward.toFixed(11) + " Dogecoin";
            var dogeResult = (exp_reward * dailyBlocks).toFixed(11);
            document.getElementById("daily").innerHTML = dogeResult + " Dogecoin" + "<br>" +(cryptoPrices.DOGE.USD * dogeResult).toFixed(11) + " $";
            document.getElementById("weekly").innerHTML = (dogeResult * 7).toFixed(11) + " Dogecoin"+ "<br>" +(cryptoPrices.DOGE.USD * dogeResult*7).toFixed(11) + " $";
            document.getElementById("monthly").innerHTML = (dogeResult * 30).toFixed(11) + " Dogecoin"+ "<br>" +(cryptoPrices.DOGE.USD * dogeResult*30).toFixed(11) + " $";
        break;
        case 3:
            document.getElementById("expected").innerHTML = exp_reward.toFixed(11) + " Litecoin";
            var ltcResult = (exp_reward * dailyBlocks).toFixed(11);
            document.getElementById("daily").innerHTML = ltcResult + " Litecoin"+ "<br>" +(cryptoPrices.LTC.USD * ltcResult).toFixed(11) + " $";
            document.getElementById("weekly").innerHTML = (ltcResult * 7).toFixed(11) + " Litecoin"+ "<br>" +(cryptoPrices.LTC.USD * ltcResult*7).toFixed(11) + " $";
            document.getElementById("monthly").innerHTML = (ltcResult * 30).toFixed(11) + " Litecoin"+ "<br>" +(cryptoPrices.LTC.USD * ltcResult*30).toFixed(11) + " $";
        break;

    }
}
