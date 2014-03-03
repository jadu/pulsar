Summary panels allow a given UI to display a rich ‘infographic’ above the main content which helps to summarise or distill often complex information in a simpler format.

![summary panel example](http://localhost:8000/docs/images/modules_summary.png)

Set the `summary` block within your view's layout, the `data-tab` attribute should reflect the ID of the tab which should show this summary panel.

    {% block summary %}
      <div class="summary hide" data-tab="#analytics">
        <!-- My summary content -->
      </div>
    {% endblock %}

In your tab object you can set a given summary panel to be opened by supplying it's ID as the `data-summary` attribute.

    {
      "id"    : "stats",
      "label" : html.icon("bar-chart") ~ " Statistics",
      "src"   : tab_statistics,
      "attr"  : "data-summary=#analytics"
    }