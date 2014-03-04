The primary navigation can be defined within a controller and is declared as a nested PHP array. It supports a nesting of three levels deep, the first level being the links which will appear in the toolbar and toggle the dropdown behaviour.

<div class="toolbar">
    <h1 class="branding" id="tour-home"><a href="/search">Jadu</a></h1>
    <div class="nav-item ">
        <a class="nav-link nav-link__toggle" data-toggle="dropdown">
            <i class="icon-file"></i> Create
        </a>
        <ul class="dropdown__menu inverse">
            <li><a href="/documents/create"><i class="icon-file-text"></i> Document</a></li>
            <li><a href="/homepages/create"><i class="icon-th-large"></i> Homepage</a></li>
            <li><a href="/news/create"><i class="icon-pushpin"></i> News</a></li>
            <li><a href="/events/create"><i class="icon-calendar"></i> Event</a></li>
            <li><a href="/xforms/create"><i class="icon-check"></i> xForm</a></li>
            <li><a href="#customizeCreateMenu"><i class="icon-list"></i> Customize</a></li>
        </ul>
    </div>
    <div class="nav-item">
        <a class="nav-link nav-link__toggle" data-toggle="dropdown">
            <i class="icon-reorder"></i> Menu
        </a>
        <ul class="dropdown__menu inverse">
            <li>
                <a href="#"><i class="icon-edit-sign"></i> Publishing</a>
                <ul data-subnav="true">
                    <li><a href="/documents/view"><i class="icon-file-text"></i> Documents</a></li>
                    <li><a href="/homepages/view"><i class="icon-th-large"></i> Homepages</a></li>
                    <li><a href="/news/view"><i class="icon-pushpin"></i> News</a></li>
                    <li><a href="/events/view"><i class="icon-calendar"></i> Events</a></li>
                    <li><a href="/announcements/view"><i class="icon-bullhorn"></i> Announcements</a></li>
                </ul>
            </li>
            <li>
                <a href="#"><i class="icon-check-sign"></i> xForms Pro</a>
                <div data-subnav="true" class="subnav-container">
                    <ul>          
                        <li><a href="/xforms/view/received"><i class="icon-inbox"></i> Received forms <span class="badge badge--primary">4</span></a></li>          
                        <li><a href="/xforms/view"><i class="icon-check"></i> Forms</a></li></ul>
                    <ul>          
                    <li><a href="/xforms/settings"><i class="icon-cog"></i> Settings</a></li></ul>
                </div>
            </li>
            <li>
                <a href="#"><i class="icon-gears"></i> Utilities</a>
                <ul data-subnav="true">
                    <li><a href="/utilities/category_builder"><i class="icon-sitemap"></i> Category builder</a></li>
                    <li><a href="/utilities/user_access"><i class="icon-group"></i> User Access</a></li>
                    <li><a href="/utilities/workflow"><i class="icon-code-fork"></i> Workflow</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>

    # /lexicon/index.php
    $toolbar = array(
        '<i class="icon-file"></i> Create' => array(
            '<i class="icon-file-text"></i> Document'           => '/documents/create',
            '<i class="icon-th-large"></i> Homepage'            => '/homepages/create',
            '<i class="icon-pushpin"></i> News'                 => '/news/create',
            '<i class="icon-calendar"></i> Event'               => '/events/create',
            '<i class="icon-check"></i> xForm'                  => '/xforms/create',
            '<i class="icon-list"></i> Customize'               => '#customiseCreateMenu'
            ),
        '<i class="icon-reorder"></i> Menu' => array(
            '<i class="icon-edit-sign"></i> Publishing' => array(
                '<i class="icon-file-text"></i> Documents'      => '/documents/view',
                '<i class="icon-th-large"></i> Homepages'       => '/homepages/view',
                '<i class="icon-pushpin"></i> News'             => '/news/view',
                '<i class="icon-calendar"></i> Events'          => '/events/view',
                '<i class="icon-bullhorn"></i> Announcements'   => '/announcements/view'
                ),
            '<i class="icon-check-sign"></i> xForms Pro' => array(
                array(
                    '<i class="icon-inbox"></i> Received forms <span class="badge badge--primary">4</span>' 
                                                                => '/xforms/view/received',
                    '<i class="icon-check"></i> Forms'          => '/xforms/view'
                    ),
                array(
                    '<i class="icon-cog"></i> Settings'         => '/xforms/settings'
                    )
                ),
            '<i class="icon-gears"></i> Utilities' => array(
                '<i class="icon-sitemap"></i> Category builder' => '/utilities/category_builder',
                '<i class="icon-group"></i> User Access'        => '/utilities/user_access',
                '<i class="icon-code-fork"></i> Workflow'       => '/utilities/workflow'
                )
            )
        );

    # pass the array to the template view
    print $template->render(array(
        'toolbar' => $toolbar
    ));


This `toolbar` array is passed to the `primary_navigation` view helper.

    {# /views/pulsar/components/toolbar.html.twig #}
    {% for label, items in toolbar %}
        {{ pulsar.primary_nav(label = label, menu_items = items) }}
    {% endfor %}
