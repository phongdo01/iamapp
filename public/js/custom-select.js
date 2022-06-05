function getCategoriesAtQuote(category_id) {
    $.get(`${url}/categories`, function (data, status) {
    if (status === "error") {
      alert("Error");
      return;
    }
    const selectElement = data.reduce((elements, item) => {
      return (
        elements +
        `
                  <option value="${item._id}" ${item._id === category_id?"selected":""}>${item.title}</option>
              `
      );
    }, "");
    $("#inlineFormCustomSelect").html(selectElement);
  });
}

function displayQuoteButton(id) {
    if (id === "editQuoteButton") {
        $("#addQuoteButton").css("display", "none");
    }
    if (id === "addQuoteButton") {
        $("#editQuoteButton").css("display", "none");
    }
}

function getDataField() {
    const category_id = $("#inlineFormCustomSelect").val();
    const category_name = $("#inlineFormCustomSelect option:selected").text();
    content = $("#content-text").val();
    if (!category_id || !category_name || !content) {
      alert("Please fill all the fields");
      return "EMPTY_FIELD";
    }
    return {category_id, content} 
}