var SELECTORS = {
    MARKDOWN_INPUT: "textarea",
    FORM: "form",
    TITLE_INPUT: "#title",
    DELETE: ".js-delete"
};

/**
 * Page View Class for the Document Edit page.
 */
var EditPage = function($scope) {
    this.$scope = $scope;

    this.$markdownInput = $scope.find(SELECTORS.MARKDOWN_INPUT);
    this.$form = $scope.find(SELECTORS.FORM);
    this.$titleInput = $scope.find(SELECTORS.TITLE_INPUT);
    this.$deleteButton = $scope.find(SELECTORS.DELETE);

    this.bind();
};
EditPage.constructor = EditPage;
EditPage.prototype = {
    bind: function() {
        // bind auto size
        // autosize(this.$markdownInput);

        var simplemde = new SimpleMDE();


        var myDropzone = new Dropzone("form#myAwesomeDropzone");
        myDropzone.on("success", function(file, responseText) {
            console.log(responseText); // console should show the ID you pointed to
            simplemde.value(simplemde.value()+ "\n![](uploads/"+responseText+")\n");
            // do stuff with file.id ...
        });

        $("form#myAwesomeDropzone").addClass('dropzone');
        
        this.$titleInput.on("input propertychange paste", this.onTitleInputChange.bind(this));
        this.$deleteButton.on("click", this.onDeleteClick.bind(this));
    },

    /**
     * Handle the event when the user changes the title input
     * @prop event [jQueryEvent]
     */
    onTitleInputChange: function(event) {
        var slug = this.titleToSlug(this.$titleInput.val());
        this.$form.prop("action", slug + "/save");
    },

    /**
     * Handle the event when the user clicks the delete button
     * @prop event [jQueryEvent]
     */
    onDeleteClick: function(event) {
        if (!confirm("Are you sure you want to delete this document?")) {
            event.preventDefault();
        }
    },

    /**
     * Converts the given title string into a URL safe slug.
     * @prop title [string] - title to conver to slug
     */
    titleToSlug: function(title) {
        return url_slug(title, {limit: 100});
    }
};

$(function() {
    var page = new EditPage($(".js-editPage"));
})