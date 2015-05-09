prefs = {
    "title"                 : "Richard Strauss: Werke | Dokumente",
    "user"                  : "alx",
    "groups"                : {"ext": "Gäste", "for": "Hilfskräfte", "hau": "Editoren"},
    "ajaxPath"              : "/exist/apps/adb",
    "pathMap"               : {
        "memorize"         : "/edit/memorize?key=",
        "permissions"      : "/edit/permissions?key=",
        "status"           : "/edit/status?key=",
        "compilationadd"   : "/edit/compilation?action=add&target=",
        "compilationremove": "/edit/compilation?action=remove&target=",
        "remove"           : "/edit/bin?action=remove&key=",
        "restore"          : "/edit/bin?action=restore&key=",
        "lock"             : "/edit/lock?action=lock&key=",
        "unlock"           : "/edit/lock?action=unlock&key=",
        "open"             : "/edit/open?key=",
        "create"           : "/edit/create?tpl=",
        "update"           : "/edit/update",
        "help"             : "/help",
        "search"           : "/search/",
        "clipboard"        : "/list/clipboard?x=",
        "latestchangeslist": "/list/latestchanges",
        "binlist"          : "/list/bin",
        "locklist"         : "/list/locklist",
        "compilation"      : "/list/compilation?s=",
        "versions"         : "/list/versions?key=",
        "searchfields"     : "/list/searchfields?cat=",
        "autocomplete"     : "/list/autocomplete",
        "overview"         : "/list/overview",
        "firstpdf"         : "/snippets/firstpdf?key=",
        "keydesc"          : "/snippets/keydesc?key=",
        "tooltip"          : "/snippets/tooltip?key=",
        "view"             : "/view/"
    },
    "doublePaneFactoryPrefs": {
        "initialCatMap": {
            "w": "work",
            "c": "corresp",
            "a": "performance",
            "p": "person",
            "o": "org",
            "e": "event",
            "r": "reception",
            "b": "literature",
            "m": "compilation",
            "g": "graphic",
            "h": "place",
            "k": "repository",
            "q": "que"
        },
        "defaultCfg"   : {
            "searchFields"       : ["fulltext", "date"],
            "leftXType"          : "searchgrid",
            "leftWidth"          : "50%",
            "rightXType"         : "detailpane",
            "rightXTypeDetail"   : "detailpane",
            "doAddListeners"     : "true",
            "pageSize"           : "100000",
            "contextMenu"        : "detailpanecontextmenu",
            "citationContextMenu": null
        },
        "cfg"          : {
            "work"       : {
                "title"  : "Werke",
                "iconCls": "zencon-pagelines",
                "tooltip": "Suchen bei Werken",
                "type"   : "work"
            },
            "corresp"    : {
                "title"           : "Korrespondenz",
                "iconCls"         : "zencon-envelope",
                "tooltip"         : "Suchen in der Korrespondenz",
                "type"            : "corresp",
                "rightXTypeDetail": "img"
            },
            "person"     : {
                "title"       : "Personen",
                "iconCls"     : "zencon-user",
                "tooltip"     : "Suchen bei Personen",
                "type"        : "person",
                "searchFields": "fulltext"
            },
            "org"        : {
                "title"       : "Organisationen",
                "iconCls"     : "zencon-users",
                "tooltip"     : "Suchen bei Organisationen",
                "type"        : "org",
                "searchFields": "fulltext"
            },
            "global"     : {
                "title"   : "Globale Suche",
                "tooltip" : "Suchen in allen Dokumenten der Datenbank",
                "type"    : "global",
                "pageSize": "100"
            },
            "performance": {
                "title"  : "Werkaufführungen",
                "iconCls": "zencon-library",
                "tooltip": "Suchen bei Werkaufführungen",
                "type"   : "performance"
            },
            "event"      : {
                "title"     : "Chronik",
                "iconCls"   : "zencon-calendar",
                "tooltip"   : "Suchen in der chronologischen Übersicht",
                "type"      : "event",
                "groupField": "date_o"
            },
            "reception"  : {
                "title"  : "Rezeptionszeugnisse",
                "iconCls": "zencon-notebook",
                "tooltip": "Suchen bei Rezeptionszeugnissen",
                "type"   : "reception"
            },
            "graphic"    : {
                "title"           : "Bildmaterial",
                "iconCls"         : "zencon-image",
                "tooltip"         : "Suchen im Bildmaterial",
                "type"            : "graphic",
                "rightXTypeDetail": "img"
            },
            "literature" : {
                "title"  : "Literatur",
                "iconCls": "zencon-book",
                "tooltip": "Suchen bei Literaturtiteln",
                "type"   : "literature"
            },
            "place"      : {
                "title"       : "Orte",
                "iconCls"     : "zencon-map-marker",
                "tooltip"     : "Suchen bei Orten",
                "type"        : "place",
                "searchFields": "fulltext"
            },
            "repository" : {
                "title"       : "Quellenstandorte",
                "iconCls"     : "zencon-map-marker",
                "tooltip"     : "Suchen bei Quellenstandorten",
                "type"        : "repository",
                "searchFields": "fulltext"
            },
            "compilation": {
                "title"              : "Zusammenstellungen",
                "iconCls"            : "zencon-stack-overflow",
                "tooltip"            : "Zusammenstellungen anzeigen",
                "type"               : "compilation",
                "searchFields"       : null,
                "leftXType"          : "compilation-flipbox",
                "leftWidth"          : "33%",
                "contextMenu"        : "compilation-detailpanecontextmenu",
                "citationContextMenu": "compilation-citcontextmenu"
            },
            "locked"     : {
                "title"       : "Gesperrte Dokumente",
                "iconCls"     : "zencon-lock",
                "tooltip"     : "Gesperrte Dokumente anzeigen",
                "type"        : "locked",
                "searchFields": null,
                "leftXType"   : "locked-searchgrid",
                "rightXType"  : "locked-detailpane"
            },
            "bin"        : {
                "title"         : "Papierkorb",
                "iconCls"       : "zencon-remove",
                "tooltip"       : "Papierkorb anzeigen",
                "type"          : "bin",
                "searchFields"  : null,
                "leftXType"     : "bin-searchgrid",
                "rightXType"    : "bin-detailpane",
                "doAddListeners": "false"
            },
            "pdf"        : {
                "title"     : "PDF-Volltexte",
                "iconCls"   : "zencon-file-pdf",
                "tooltip"   : "PDF-Volltexte durchsuchen",
                "leftXType" : "pdf-searchgrid",
                "type"      : "pdf",
                "groupField": "key",
                "pageSize"  : "200"
            }
        }
    },
    "bugTrackerPath"        : "http://rsga.bplaced.net/bt",
    "oxyJnlp"               : "/ahlsen/oxy/xml-editor.jnlp",
    "currentUser"           : "alx",
    "imagePath"             : "/exist/ahlsen/media/img/",
    "ui"                    : {
        "eventTypeMenuConfig": [{
            "type"   : "work",
            "text"   : "Werke",
            "colIcon": "zencon-pagelines"
        }, {"type": "corresp", "text": "Korrespondenz", "colIcon": "zencon-envelope"},
            {"type": "reception", "text": "Rezeptionszeugnisse", "colIcon": "zencon-notebook"},
            {"type": "graphic", "text": "Bildmaterial", "colIcon": "zencon-image"},
            {"type": "performance", "text": "Aufführungen", "colIcon": "zencon-library"},
            {"type": "literature", "text": "Literatur", "colIcon": "zencon-book"}, {"xtype": "menuseparator"},
            {"type": "T", "text": "Treffen", "colIcon": "zencon-comments"},
            {"type": "M", "text": "Häusliches Musizieren", "colIcon": "zencon-music"},
            {"type": "S", "text": "Schöpferische Tätigkeit", "colIcon": "zencon-quill"},
            {"type": "P", "text": "Probe", "colIcon": "zencon-magic"},
            {"type": "B", "text": "Geschäftstätigkeit", "colIcon": "zencon-money"},
            {"type": "R", "text": "Reise", "colIcon": "zencon-suitcase"},
            {"type": "unknown", "text": "Unbekannte Ereignisart", "colIcon": null},
            {"type": "other", "text": "Alle anderen Ereignisse", "colIcon": null}],
        "tooltips"           : true,
        "showEditorMenu"     : true,
        "editactions"        : true,
        "searchMenuItems"    : ["corresp", "reception", "graphic", "-", "work", "person", "org", "place", "event",
            "performance", "-", "compilation", "literature", "repository", "-", "pdf"],
        "createDialogItems"  : [{
            "name"   : "corresp",
            "text"   : "Korrespondenz",
            "iconCls": "zencon-envelope black"
        }, {"name": "reception-auf", "text": "Rezeptionszeugnis (Aufsatz)", "iconCls": "zencon-notebook black"},
            {"name": "reception-mon", "text": "Rezeptionszeugnis (Monographie)", "iconCls": "zencon-notebook black"},
            {"name": "reception-sam", "text": "Rezeptionszeugnis (Sammelwerk)", "iconCls": "zencon-notebook black"},
            {"name": "graphic", "text": "Bildmaterial", "iconCls": "zencon-image black"},
            {"name": "work", "text": "Werk", "iconCls": "zencon-pagelines black"},
            {"name": "person", "text": "Person", "iconCls": "zencon-user black"},
            {"name": "org", "text": "Organisation", "iconCls": "zencon-users black"},
            {"name": "place", "text": "Ort", "iconCls": "zencon-map-marker black"},
            {"name": "performance", "text": "Ereignis (Aufführung)", "iconCls": "zencon-library black"},
            {"name": "event", "text": "Ereignis (alle anderen)", "iconCls": "zencon-calendar black"},
            {"name": "literature-auf", "text": "Literatur (Aufsatz)", "iconCls": "zencon-book black"},
            {"name": "literature-mon", "text": "Literatur (Monographie)", "iconCls": "zencon-book black"},
            {"name": "literature-sam", "text": "Literatur (Sammelwerk)", "iconCls": "zencon-book black"},
            {"name": "repository", "text": "Quellenstandort", "iconCls": "zencon-map-marker black"}],
        "initialViewerMap"   : {
            "w": "work",
            "c": "corresp",
            "a": "performance",
            "p": "person",
            "o": "org",
            "e": "event",
            "r": "literature",
            "b": "literature",
            "g": "graphic",
            "m": "compilation",
            "h": "place",
            "k": "repository",
            "q": "other"
        }
    },
    "actionConfig"          : {
        "openDetailTab"        : {
            "text"   : "In neuem Tab anzeigen",
            "action" : "opendetailtab",
            "iconCls": "zencon-newtab adjust"
        },
        "editDoc"              : {
            "text"   : "Bearbeiten",
            "action" : "editdoc",
            "iconCls": "zencon-pencil adjust",
            "tooltip": "Bearbeiten in oXygen"
        },
        "memorize"             : {
            "text"   : "Merken",
            "action" : "memorize",
            "iconCls": "zencon-lightbulb adjust",
            "tooltip": "Zum Einfügen an anderem Ort merken"
        },
        "moveToBin"            : {
            "text"   : "Löschen",
            "action" : "movetobin",
            "iconCls": "zencon-remove adjust",
            "tooltip": "In den Papierkorb verschieben"
        },
        "addToCompilation"     : {"text": "Gemerktes Dokument hinzufügen", "action": "compilationiteminsert"},
        "removeFromCompilation": {
            "text"   : "Aus dieser Zusammenstellung entfernen",
            "action" : "compilationitemremove",
            "iconCls": "zencon-remove black"
        }
    }
};