import BpmnModeler from 'bpmn-js/lib/Modeler';

import customControls from './custom';
import minimapModule from 'diagram-js-minimap';
import BpmnColorPickerModule from 'bpmn-js-color-picker';

class WorkflowDesigner {

    async init () {
        var diagramUrl = 'http://localhost:3000/resources/bpmn/HR Schools - Case Type 3 - Job Application.bpmn';

        // modeler instance
        var bpmnModeler = new BpmnModeler({
            container: '.bpmn',
            additionalModules: [
              minimapModule,
              customControls,
              BpmnColorPickerModule
            ],
            keyboard: {
                bindTo: window
            }
        });

      /**
       * Save diagram contents and print them to the console.
       */
      async function exportDiagram() {

        try {

          var result = await bpmnModeler.saveXML({ format: true });

          alert('Diagram exported. Check the developer tools!');

          console.log('DIAGRAM', result.xml);
        } catch (err) {

          console.error('could not save BPMN 2.0 diagram', err);
        }
      }

      /**
       * Open diagram in our modeler instance.
       *
       * @param {String} bpmnXML diagram to display
       */
      async function openDiagram(bpmnXML) {

        // import diagram
        try {

          await bpmnModeler.importXML(bpmnXML);

          // access modeler components
          var canvas = bpmnModeler.get('canvas');
          var overlays = bpmnModeler.get('overlays');

          // zoom to fit full viewport
          // canvas.zoom('fit-viewport');

          // attach an overlay to a node
          overlays.add('Activity_0bk8zez', 'note', {
            position: {
              top: 0,
              right: 0
            },
            html: '<div class="rule"><i class="icon-robot"></i></div>'
          });

          overlays.add('Activity_05ifs99', 'note', {
            position: {
              top: 0,
              right: 0
            },
            html: '<div class="rule"><i class="icon-envelope"></i></div>'
          });

          overlays.add('Activity_09k2p7c', 'note', {
            position: {
              top: 0,
              right: 0
            },
            html: '<div class="rule"><i class="icon-robot"></i> <i class="icon-envelope"></i></div>'
          });
          // add marker
        //   canvas.addMarker('SCAN_OK', 'needs-discussion');
        } catch (err) {

          console.error('could not import BPMN 2.0 diagram', err);
        }
      }


      // load external diagram file via AJAX and open it
      $.get(diagramUrl, openDiagram, 'text');

      $('#save-button').click(exportDiagram);
    }
}

module.exports = WorkflowDesigner;