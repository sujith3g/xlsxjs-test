randomColor = function() {
    var colors = ['navy', 'slate', 'olive', 'moss', 'chocolate'];
    return colors[(Math.random() * colors.length) >>> 0];
};
Template.layout.events({
    'click #core_icon_button': function(e) {
        var drawer_panel = document.querySelector("#core_drawer_panel");
        drawer_panel.forceNarrow = !(drawer_panel.forceNarrow);
        var core_icon = e.currentTarget;
        core_icon.icon = (drawer_panel.forceNarrow ? "menu" : "arrow-back");
    }
});