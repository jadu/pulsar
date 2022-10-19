export default class CustomPalette {
    constructor(create, elementFactory, palette, translate) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
  
      palette.registerProvider(this);
    }
  
    getPaletteEntries(element) {
      const {
        create,
        elementFactory,
        translate
      } = this;
  
      function createUserTask(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
  
        create.start(event, shape);
      }
  
      return function (entries) {
        delete entries["create.group"];
        delete entries["create.participant-expanded"];
        delete entries["create.subprocess-expanded"];
        delete entries["create.data-object"];
        delete entries["create.data-store"];
  
        entries["create.user-task"] = {
          group: 'activity',
          className: 'bpmn-icon-user-task',
          title: translate('Create UserTask'),
          action: {
            dragstart: createUserTask,
            click: createUserTask
          }
        };
        return entries;
      };
    }
  }
  
  CustomPalette.$inject = [
    'create',
    'elementFactory',
    'palette',
    'translate'
  ];