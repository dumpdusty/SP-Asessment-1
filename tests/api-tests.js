//tests below covering the API call for calculation of date on which a settlement will reach a bank account

const request = require('supertest');
const {expect} = require('chai')

describe('Get Date with valid data', async () => {
    let res
    let date = '2023-02-07'
    let delay = Math.trunc(Math.random() * 10)
    before(async () => {
        res = await request('localhost:3000/api/v1/')
            .get(`settlementDate?initialDate=${date}&delay=${delay}`)

    })
    it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
    });
    it('check the response contains the answer', () => {
        expect(res.body.results.businessDate).to.be.a('string')
    })
    it('check the response contains initial date', () => {
        expect(res.body.initialQuery.initialDate).to.eq(date.toString())
    })
    it('check the response contains delay', () => {
        expect(res.body.initialQuery.delay).to.eq(delay.toString())
    })
    it('check total days value', ()=>{
        expect(res.body.results.totalDays).to.eq(delay+res.body.results.holidayDays+res.body.results.weekendDays)
    })
});

describe('Get Date with incorrect date format', async () => {
    let res
    let date ='02-07-2023'
    let delay = Math.trunc(Math.random() * 10)
    before(async () => {
        res = await request('localhost:3000/api/v1/')
            .get(`settlementDate?initialDate=${date}&delay=${delay}`)
    })
    it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
    });
    it('check the response contains the answer', () => {
        expect(res.body.results.businessDate).to.be.a('null')
    })
});

describe('Get Date with negative delay value', async () => {
    let res
    let date ='2023-02-07'
    let delay = Math.trunc(Math.random() * -10)
    before(async () => {
        res = await request('localhost:3000/api/v1/')
            .get(`settlementDate?initialDate=${date}&delay=${delay}`)
    })
    it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
    });


    it('check the response contains the answer', () => {
        expect(res.body.results.businessDate).to.be.a('null')
    })
});

// this test show the function is working incorrectly
describe('Get Date with zero delay value', async () => {
    let res
    let date ='2023-02-07'
    let delay = 0
    before(async () => {
        res = await request('localhost:3000/api/v1/')
            .get(`settlementDate?initialDate=${date}&delay=${delay}`)

    })
    it('check the status code', () => {
        expect(res.statusCode).to.eq(200)
    });
    it('check the response contains the answer', () => {
        expect(res.body.results.businessDate.split('T')[0]).to.eq(date)
    })

});
