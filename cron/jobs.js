function test() {
    console.log('Test funciton called')
}

const jobs = [
    {
        id: 1,
        name: 'Test',
        cronTime: '* * * * *',
        active: false,
        fn: test
    }
]

module.exports = jobs
