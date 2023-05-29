const express = require('express')
const router = express.Router()
const Game = require('../models/Game')


// Route 1: Fetching all notes using Post:- localhost:5000/api/notes/fetchallnotes
router.post('/creategame', async (req, res) => {
    try {
        let sudoku = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        const Random = () => {
            return Math.floor(Math.random() * 9 + 1)
        }
        const fillValue = () => {
            for (let index = 0; index < 9; index = index + 3) {
                fillBox(index, index)
            }
            fillRemaining(0, 3)
        }
        const fillBox = (row, col) => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let num
                    do {
                        num = Random();
                    }
                    while (!unUsedInBox(row, col, num));
                    sudoku[row + i][col + j] = num
                }
            }
        }
        const unUsedInBox = (row, col, num) => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (sudoku[row + i][col + j] === num)
                        return false
                }
            }
            return true
        }
        const unUsedInRow = (row, num) => {
            for (let j = 0; j < 9; j++) {
                if (sudoku[row][j] === num)
                    return false
            }
            return true
        }
        const unUsedInCol = (col, num) => {
            for (let i = 0; i < 9; i++) {
                if (sudoku[i][col] === num)
                    return false
            }
            return true
        }
        const CheckIfSafe = (row, col, num) => {
            return (unUsedInRow(row, num) && unUsedInCol(col, num) && unUsedInBox(row - row % 3, col - col % 3, num))
        }
        const fillRemaining = (i, j) => {
            if (j >= 9 && i < 8) {
                i = i + 1
                j = 0
            }
            if (j >= 9 && i >= 9) {
                return true
            }
            if (i < 3) {
                if (j < 3) {
                    j = 3
                }
            }
            else if (i < 6) {
                if (j === parseInt(i / 3) * 3) {
                    j = j + 3
                }
            }
            else {
                if (j === 6) {
                    i = i + 1
                    j = 0
                    if (i >= 9) {
                        return true
                    }
                }
            }
            for (let num = 1; num <= 9; num++) {
                if (CheckIfSafe(i, j, num)) {
                    sudoku[i][j] = num
                    if (fillRemaining(i, j + 1))
                        return true
                    sudoku[i][j] = 0
                }
            }
            return false

        }

        fillValue()
        let g = await Game.findOne({ game: sudoku });
        if (!g) {
            const game = await Game.create({
                game: sudoku,
            })
            res.send(game)
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).send({ error: "Some error occured" });

    }
})
router.get('/findgame', async (req, res) => {
    try {
        Game.count().exec(function (err, count) {

            // Get a random entry
            var random = Math.floor(Math.random() * count)
          
            // Again query all users but only fetch one offset by our random #
            Game.findOne().skip(random).exec(
              function (err, result) {
                // Tada! random user
                res.send(result)
              })
          })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Some error occured" });

    }
})


module.exports = router;