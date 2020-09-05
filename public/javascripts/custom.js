function updateModels(companyName, inventory) {
    inventory = JSON.parse(inventory);
    var companyId = companyName.value;
    var models = inventory.find((obj) => obj._id === companyId).models;

    models.sort((a, b) => (a.modelNo > b.modelNo) ? 1 : -1);

    $('#modelOptions').children().not(':first').remove();

    models.forEach((obj) => {
        $('#modelOptions')
            .append($("<option></option>")
                .val(obj._id)
                .text(obj.modelNo));
    });

    $("#modelOptions").val($("#modelOptions option:first").val());

}

function updateColors(modelName, inventory) {
    inventory = JSON.parse(inventory);
    var modelId = modelName.value;

    let allModels = inventory.reduce((prev, next) => prev.concat(next.models), []);
    let colors = allModels.find(obj => obj._id === modelId).colors;
    colors.sort((a, b) => (a.modelNo > b.modelNo) ? 1 : -1);

    $('#colorOptions').children().not(':first').remove();
    if (colors.length === 0) {
        $("#colorOptions option:first").text("No Color Available for this Model");
        $("#colorOptions").prop('required', false);
    }

    else {
        $("#colorOptions option:first").text("Select a Color");
        $("#colorOptions").prop('required', true);
        colors.forEach((obj) => {
            $('#colorOptions')
                .append($("<option></option>")
                    .val(obj._id)
                    .text(obj.colorName));
        });
    }

    $("#colorOptions").val($("#colorOptions option:first").val());
}

function updateAction(action) {
    action = action.value;
    $("button").removeClass("d-none");
    if (action === "sell") {
        $("button").removeClass("btn-success");
        $("button").addClass("btn-danger");
        $("button").text("Sell");
        $('form').attr('action', "/update?action=sell")
    }
    else if (action === "purchase") {
        $("button").removeClass("btn-danger");
        $("button").addClass("btn-success");
        $("button").text("Purchase");
        $('form').attr('action', "/update?action=purchase")
    }
}

// ---------------------------------------------
// Index Page JS

$(window).on('resize', function () {
    var win = $(this);
    if (win.width() < 575) {
        $('#social-icons-row').addClass('mx-5');
    } else {
        $('#social-icons-row').removeClass('mx-5');
    }
});

$(window).on('resize', function () {
    var win = $(this);
    if (win.width() < 767) {
        $('#social-icons-row').addClass('mb-5');
        $('#column-two').removeClass('my-5');
        $('#about-section').removeClass('mt-4');
    } else {
        $('#social-icons-row').addClass('mb-5');
        $('#about-section').addClass('mt-4');
        $('#column-two').addClass('my-5');
    }
});
