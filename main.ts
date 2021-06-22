function bldNbrs () {
    neighbors[0] = 1
    neighbors[1] = -1
    neighbors[2] = diam
    neighbors[3] = -1 * diam
    neighbors[4] = 1 + -1 * diam
    neighbors[5] = -1 * diam - 1
    neighbors[6] = diam + 1
    neighbors[7] = diam - 1
}
function cellGen (cell: number, count: number) {
    val = Universe[cell]
    if (count < 2) {
        nxt = 0
    }
    if (count == 2) {
        nxt = val
    }
    if (count == 3) {
        nxt = 1
    }
    if (count > 3) {
        nxt = 0
    }
    Next[cell] = nxt
}
function cntNbors (num: number) {
    tot = 0
    for (let index = 0; index <= 7; index++) {
        tot = tot + Universe[findCell(num, neighbors[index])]
    }
    return tot
}
function findCell (num: number, num2: number) {
    total = num + num2
    if (total < 0) {
        total = total + UNIall
    }
    if (total > unisize) {
        total = total - UNIall
    }
    return total
}
function doGen () {
    for (let index2 = 0; index2 <= unisize; index2++) {
        cellGen(index2, cntNbors(index2))
    }
    for (let index3 = 0; index3 <= unisize; index3++) {
        Universe[index3] = Next[index3]
    }
    Chk_Extinct()
    showUni()
}
function Chk_Extinct () {
    Pop = 0
    for (let index4 = 0; index4 <= unisize; index4++) {
        if (1 == Universe[index4]) {
            Pop += 1
        }
    }
    if (Pop == 0) {
        basic.showIcon(IconNames.No)
        basic.pause(100)
        basic.showIcon(IconNames.Sad)
        basic.pause(100)
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
function showUni () {
    for (let ydex = 0; ydex <= 4; ydex++) {
        for (let xdex = 0; xdex <= 4; xdex++) {
            uplace = xdex + ydex * diam
            if (Universe[uplace] == 0) {
                led.unplot(xdex, ydex)
            } else {
                led.plot(xdex, ydex)
            }
        }
    }
}
input.onButtonPressed(Button.A, function () {
    doGen()
})
input.onButtonPressed(Button.AB, function () {
    pattern = 1 + pattern
    if (3 < pattern) {
        pattern = 0
    }
    if (0 == pattern) {
        Universe[11] = 1
        Universe[12] = 1
        Universe[13] = 1
        Universe[18] = 1
        Universe[22] = 1
    }
    if (1 == pattern) {
        setXY(2, 1)
        setXY(2, 2)
        setXY(2, 3)
    }
    if (2 == pattern) {
        Universe[2] = 1
        Universe[7] = 1
        Universe[12] = 1
        Universe[17] = 1
        Universe[22] = 1
    }
    if (3 == pattern) {
        Universe[11] = 1
        Universe[12] = 1
        Universe[13] = 1
        Universe[17] = 1
        Universe[6] = 1
    }
    showUni()
})
input.onButtonPressed(Button.B, function () {
    for (let index5 = 0; index5 <= unisize; index5++) {
        if (8 < randint(0, 10)) {
            Universe[index5] = 1
        }
    }
    showUni()
})
input.onGesture(Gesture.Shake, function () {
    Chk_Extinct()
    basic.showString("Pop:")
    basic.showString(convertToText(Pop))
})
function setXY (nx: number, ny: number) {
    Universe[nx + ny * diam] = 1
}
function findCoord (num: number) {
    sy = Math.trunc(num / diam)
    sx = num % diam
}
let sx = 0
let sy = 0
let uplace = 0
let Pop = 0
let total = 0
let nxt = 0
let val = 0
let Next: number[] = []
let neighbors: number[] = []
let Universe: number[] = []
let pattern = 0
let tot = 0
let UNIall = 0
let unisize = 0
let diam = 0
diam = 5
unisize = diam * diam - 1
UNIall = diam * diam
tot = 0
pattern = 0
Universe = [0]
neighbors = [0, 0, 0, 0, 0, 0, 0, 0]
bldNbrs()
for (let index = 0; index < unisize; index++) {
    Universe.push(0)
}
Next = [unisize]
for (let index = 0; index < unisize; index++) {
    Next.push(0)
}
images.createBigImage(`
    # . . # . # # . # #
    # . . . . # . . # .
    # . . # . # # . # #
    # . . # . # . . # .
    # # . # . # . . # #
    `).scrollImage(1, 200)
images.createBigImage(`
    . . . . . . . . . .
    . . . . # # . . . .
    . . . . # # . # # .
    . # # . . . . # # .
    . # # . . . . . . .
    `).scrollImage(1, 200)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
