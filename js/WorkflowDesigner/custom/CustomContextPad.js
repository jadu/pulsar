export default class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
  
      if (config.autoPlace !== false) {
        this.autoPlace = injector.get('autoPlace', false);
      }
  
      contextPad.registerProvider(this);
    }
  
    getContextPadEntries(element) {
      const {
        autoPlace,
        create,
        elementFactory,
        translate
      } = this;
  
      function appendUserTask(event, element) {
        if (autoPlace) {
          const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
  
          autoPlace.append(element, shape);
        } else {
          appendUserTaskStart(event, element);
        }
      }
  
      function appendUserTaskStart(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
  
        create.start(event, shape, element);
      }
  
      return function (entries) {
        if (element.type === "bpmn:UserTask") {
          delete entries["replace"];
        }
  
        entries["append.user-task"] = {
          group: 'model',
          className: 'bpmn-icon-user-task',
          title: translate('Append UserTask'),
          action: {
            click: appendUserTask,
            dragstart: appendUserTaskStart
          }
        };
        return entries;
      };
    }
  }
  
  CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
  ];