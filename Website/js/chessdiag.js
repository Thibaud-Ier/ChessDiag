var board;

var main = function () {
    board = ChessBoard('board', {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true
    });
    $('#startBtn').on('click', board.start);
    $('#clearBtn').on('click', board.clear);
    $('#download').on('click', download);
};

var saveBlob = function (blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
};

var save = function (filename, type, data) {
    var blob = new Blob([data], { type: type });
    saveBlob(blob, filename);
};


var downloadFen = function () {
    var fen = board.fen();

    save("chessdiag.fen", "text/fen", fen);
};

var downloadImage = function () {
    var chessboard = $("div#board div[class^='board-']");

    html2canvas(chessboard[0], {
        onrendered: function (canvas) {
            var data = canvas.toBlob(function (blob) {
                saveBlob(blob, "chessdiag.png");
            })
        }
    });

    //https://html2canvas.hertzen.com/examples.html
};


var download = function () {
    var typefile = $('input[name=typefile]:checked', '#typefile').val();

    if (typefile === "fen") {
        downloadFen();
    }
    else if (typefile === "png") {
        downloadImage();
    }
};