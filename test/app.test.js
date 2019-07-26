const app = require('../app')

test('case: when n === 0, result is 0', () => {
    expect(app.fibonacci(0)).toBe(0)
})
test('case: when n === 1, result is 1', () => {
    expect(app.fibonacci(1)).toBe(1)
})
test('case: when n === 10, result is 55', () => {
    expect(app.fibonacci(10)).toBe(55)
})
test('case: when n < 0, result is error', () => {
    expect(() => {app.fibonacci(-10)}).toThrow('n should above 0')
})
test('case: when n > 30, result is error', () => {
    expect(() => {app.fibonacci(50)}).toThrow('n should below 30')
})
test('case: when n !=== number, result is error', () => {
    expect(() => {app.fibonacci('Jest')}).toThrow('n should be a number')
})
