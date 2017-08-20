var board;

var init = function () {
    board = ChessBoard('board', {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true
    });
    $('#startBtn').on('click', board.start);
    $('#clearBtn').on('click', board.clear);
    $('#download').on('click', download);
    $("input[name=typefile]").click(function () {
        var typefile = $('input[name=typefile]:checked', '#typefile').val();

        if (typefile === "fen") {
            $("#filesize").addClass("hidden");
        }
        else if (typefile === "png") {
            $("#filesize").removeClass("hidden");
        }
    });
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

var downloadImage = function () {
    var chessboard = $("div#board div.board-b72b1");
    var typefile = $('input[name=size]:checked', '#size').val();
    var size = Number(typefile) * (96 / 2.54);

    html2canvas(chessboard[0], {
        onrendered: function (canvas) {
            canvas = resizeCanvas(canvas, size, size);
            canvas.toBlob(function (blob) {
                downloadBlob(blob, "chessdiag.png");
            })
        },
    });

    //https://html2canvas.hertzen.com/examples.html
};

var downloadFen = function () {
    var fen = board.fen();

    downloadFile("chessdiag.fen", "text/fen", fen);
};

var downloadFile = function (filename, type, data) {
    var blob = new Blob([data], { type: type });
    downloadBlob(blob, filename);
};

var resizeCanvas = function (canvas, width, height) {
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;

    tempCanvas.getContext('2d').drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);

    return tempCanvas;
};

var downloadBlob = function (blob, filename) {
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
