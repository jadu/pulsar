The tabbed layout is Pulsar's default and consists of a list of clickable tabs down the left hand side and their respective content on the right. The tab content is ususally a form or a data-grid, but can be more complex depending on the needs of the interface.

![tabbed layout example](http://localhost:8000/docs/images/layout_tabbed.png)

There are two template blocks which should be set by a view:

    {% block tabs_list %} 
        <!-- tabs list -->
    {% endblock %}
    
    {% block tabs_content %} 
        <!-- tabs content -->
    {% endblock %}

## Tabs object

The information for the individual tabs and their content is defined in a JSON object that you will pass to the `html.tabs()` and `html.tabs_content()` helpers to physically render them.


    {% 
      set tabs = [
        {
          "id"    : "buttons", 
          "label" : html.icon("plus-sign-alt") ~ " Buttons",
          "src"   : tab_buttons
        },
        {
          "id"    : "decks",   
          "label" : html.icon("columns") ~ " Decks",
          "src"   : tab_decks
        },
        {
          "id"    : "flash",   
          "label" : html.icon("warning-sign") ~ " Flash messages",
          "src"   : tab_flash
        }
      ]
    %}

### Sub-navigation

A tab can declare a number of sub-tabs which will be expanded when the user clicks the parent tab.

    {
      "id"        : "examples",
      "label"     : html.icon("desktop") ~ " UI Examples",
      "sub_tabs"  : [
        {
          "id"    : "summary",
          "label" : html.icon("bar-chart") ~ " Table with summary",
          "src"   : tab_form_summary,
          "attr"  : "data-summary=#summary"
        }
      ]
    }

## Tabs list

Pass your tabs object to the `html.tabs` helper and they'll be rendered as clickable tabs.

Available parameters:

    {{ html.tabs(tabs) }}
    
In your view you can populate the `tabs_list` block to place your tabs in the correct position and optionally choose which tab should be active on page load.

    {% block tabs_list %}
        {{ html.tabs(tabs) }}
    {% endblock %}

<ul class="tabs__list">
    <li><a href="#buttons" data-toggle="tab"><i class="icon-plus-sign-alt"></i> Buttons</a></li>
    <li class="is-active"><a href="#decks" data-toggle="tab"><i class="icon-columns"></i> Decks</a></li>
    <li><a href="#flash" data-toggle="tab"><i class="icon-warning-sign"></i> Flash</a></li>
</ul>

<br style="clear:both;" />

The ID attribute for each tab link will be automatically generated in the format `tab_x` so that they correspond with their respective tab content.

## Tabs content

Pass your tabs object to the `html.tabs_content` helper to render each tab's `src` as a tab pane.

    {% block tabs_content %}
        {{ html.tabs_content(tabs) }}
    {% endblock %}

## Putting it all together

Create the contents of your tabs and pass them to the `html.tabs_content` helper within the `tabs_content` block in your view. To keep your views more modular you should keep the tab content separate where possible, like in a directory called `/tabs` in your view.

    {# Populate the tab panes #}

        {% set tab_buttons %}
            {% include 'tabs/buttons.html.twig' %}
        {% endset %}
        
        {% set tab_columns %}
            {% include 'tabs/columns.html.twig' %}
        {% endset %}
        
        {% set tab_alerts %}
            {% include 'tabs/alerts.html.twig' %}
        {% endset %}

    {# Create the tab object #}

        {% 
          set tabs = [
            {
              "id"    : "buttons", 
              "label" : html.icon("plus-sign-alt") ~ " Buttons",
              "src"   : tab_buttons
            },
            {
              "id"    : "decks",   
              "label" : html.icon("columns") ~ " Decks",
              "src"   : tab_decks
            },
            {
              "id"    : "flash",   
              "label" : html.icon("warning-sign") ~ " Flash messages",
              "src"   : tab_flash
            }
          ]
        %}

    {# Pass everything to the view #}

        {% block tabs_list %}
            {{ html.tabs(tabs) }}
        {% endblock %}
        
        {% block tabs_content %}
            {{ html.tabs_content(tabs) }}
        {% endblock %}

    {# Profit? #}


## Active tab

You can choose which tab to have open when the page is first viewed by setting the ID as the `tab` url paramater. The first tab is always opened by default.

If the active tab is a sub-navigation tab, the parent tab will be automatically opened on page load.

    www.example.com/view/mypage?tab=mytab

## Sidebar

Tab panes can have a right-hand sidebar which is useful for inline documentation, the sidebar element must appear before the main tab content for styling reasons.

![tabbed layout with sidebar example](http://localhost:8000/docs/images/layout_tabbed-sidebar.png)

    <div class="tab__inner">
        <div class="tab__sidebar">
            ...
        </div>
        <div class="tab__main">
            ...
        </div>
    </div>