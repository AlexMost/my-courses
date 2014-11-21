# University of Washington, Programming Languages, Homework 6, hw6runner.rb

# This is the only file you turn in, so do not modify the other files as
# part of your solution.

class MyPiece < Piece
  # The constant All_My_Pieces should be declared here
  All_My_Pieces = [
    [[[0, 0], [1, 0], [0, 1], [1, 1]]],  # square (only needs one)
    rotations([[0, 0], [-1, 0], [1, 0], [0, -1]]), # T
    [[[0, 0], [-1, 0], [1, 0], [2, 0]], # long (only needs two)
    [[0, 0], [0, -1], [0, 1], [0, 2]]],
    rotations([[0, 0], [0, -1], [0, 1], [1, 1]]), # L
    rotations([[0, 0], [0, -1], [0, 1], [-1, 1]]), # inverted L
    rotations([[0, 0], [-1, 0], [0, -1], [1, -1]]), # S
    rotations([[0, 0], [1, 0], [0, -1], [-1, -1]]),

    # new pieces from task
    rotations([[-1, 0], [0, 0], [0, 1], [-1, 1], [1, 1]]),
    rotations([[-1, 0], [0, 0], [1, 0], [2, 0], [3, 0]]),
    rotations([[-1, 0], [-1, 1], [0, 1]])
  ]

  Single_Square = [[[-1, 0]]]

  def self.next_piece (board)
    Piece.new(All_My_Pieces.sample, board)
  end

  def self.get_single_square (board)
    Piece.new(Single_Square, board)
  end

end

class MyBoard < Board
  # your enhancements here

  def initialize (game)
    @grid = Array.new(num_rows) {Array.new(num_columns)}
    @current_block = MyPiece.next_piece(self)
    @score = 0
    @game = game
    @cheat = false
    @delay = 500
  end

  # rotates the current piece clockwise
  def rotate_180
    if !game_over? and @game.is_running?
      @current_block.move(0, 0, 2)
    end
    draw
  end

  def use_cheat
    if @score >= 100
        @score -= 100
        @cheat = true
    end
  end

  def next_piece
    if @cheat
        @current_block = MyPiece.get_single_square(self)
    else
        @current_block = MyPiece.next_piece(self)
    end

    @current_pos = nil
  end

  def store_current
    locations = @current_block.current_rotation
    displacement = @current_block.position

    (0..locations.size - 1).each{|index| 
      current = locations[index];
      @grid[current[1]+displacement[1]][current[0]+displacement[0]] = 
      @current_pos[index]
    }

    remove_filled
    @delay = [@delay - 2, 80].max

    # If that was cheater block
    if locations.size == 1
        @cheat = false
    end
  end

end

class MyTetris < Tetris

  def key_bindings
    super
    @root.bind('u', proc {@board.rotate_180})
    @root.bind('c', proc {@board.use_cheat})
  end

  def set_board
    @canvas = TetrisCanvas.new
    @board = MyBoard.new(self)
    @canvas.place(@board.block_size * @board.num_rows + 3,
                  @board.block_size * @board.num_columns + 6, 24, 80)
    @board.draw
  end

end


