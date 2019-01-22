//const request = require('request');
const request = require('request-promise');
const cheerio = require('cheerio');

class stock
{
    constructor(n)
    {
        this.stock = n;
        this.historical=`https://finance.yahoo.com/quote/${n}/history?p=${n}`;
    }
    async getQuote()
    {
        let html= await request('https://quotes.wsj.com/'+this.stock);
        const $ = cheerio.load(html);
        let data = [];
        data.push($('#quote_val').text());
        data.push($('.diff_price','.crinfo_diff').text());
        data.push($('.diff_percent','.crinfo_diff').text());
        //console.log(data);
        return data;
    }
    async getFin()
    {
        let html= await request('https://quotes.wsj.com/'+this.stock);
        const $ = cheerio.load(html);
        let data = [];
        data.push($('.data_data','ul[class=cr_data_collection]').eq(0).text());
        data.push( $('.data_data','ul[class=cr_data_collection]').eq(2).text().split(' ')[1] )//split by space, get 1st result
        data.push( $('.data_data','ul[class=cr_data_collection]').eq(3).text() );
        data.push( $('.data_data','ul[class=cr_data_collection]').eq(4).text() );
        //open, P/E, EPS, M.CAP
        return data;
    }
    async getHistory()
    {
        //we want close price not adjusted close!

        //https://www.nasdaq.com/symbol/ge/historical
        //https://httpbin.org/post
        let arr=[];
        await request('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+this.stock+'&outputsize=full&apikey=EOQA5AGR365JSWES',{json:true})
        .then((quotes)=>
        {
            //process json
            let c=0;
            let closingPrices = quotes['Time Series (Daily)']
            for(let key in closingPrices)
            {
                if(c==252)
                    break;
                else
                    arr.push([      key,closingPrices[key]["4. close"]  ]);
                    c+=1;
            }
            //console.log(arr[0]);
            //console.log(arr[251]);
        });
        return arr;
    }
    async readArticles()
    {
        //npm 'natural'
    }
    fun()
    {
        /* //return this.stock+this.historical
        var options = 
        { 
            method: 'POST',
            url: 'https://www.nasdaq.com/symbol/ge/historical',
            headers: 
            { 'postman-token': '83993654-a2f6-b811-2bad-7e56ac6b6865',
                'cache-control': 'no-cache',
                'content-type': 'text/plain' },
            body:'5d|false|ge',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            json:false,
            timeout:2500,
            debug:true
        };


         request(options)
        .then(res => 
            console.log(res)
        )
        .catch(err => 
            console.log(err)
        ); */
    }
}
//var x= new stock('AAPL');
//x.fun();
/* x.getHistory().then(data=>
    {
        console.log(data[0],data[251]);
    });
 */
module.exports = stock;