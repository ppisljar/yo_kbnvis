import 'plugins/<%= name %>/<%= name %>.less';
import { CATEGORY } from 'ui/vis/vis_category';
<% if (type === 'angular') { -%>
import 'plugins/<%= name %>/vis_controller';
<% } -%>
<% if (type === 'react') { -%>
import 'plugins/<%= name %>/vis_component';
<% } -%>
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
<% if (editor === 'default') { -%>
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';
<% } -%>
<% if (editor === 'default') { -%>
import optionsTemplate from 'plugins/<%= name %>/options_template.html';
<% } -%>
<% if (type === 'angular') { -%>
import visTemplate from 'plugins/<%= name %>/vis_template.html';
<% } -%>
<% if (type === 'js') { -%>
import { VisController } from 'plugins/<%= name %>/vis_controller';
<% } -%>
<% if (editor === 'custom') { -%>
import { EditorController } from 'plugins/<%= name %>/editor_controller';
<% } -%>
<% if (request_handler === 'custom') { -%>
import { requestHandler } from 'plugins/<%= name %>/request_handler';
<% } -%>
<% if (response_handler === 'custom') { -%>
import { responseHandler } from 'plugins/<%= name %>/response_handler';
<% } -%>

function <%= vis_provider %>(Private) {
  const VisFactory = Private(VisFactoryProvider);
<% if (editor === 'default') { -%>
  const Schemas = Private(VisSchemasProvider);
<% } -%>

  // return the visType object, which kibana will use to display and configure new Vis object of this type.
  return VisFactory.create<%= factory_type %>Visualization({
    name: '<%= name %>',
    title: '<%= title %>',
    icon: 'fa fa-gear',
    description: '<%= description %>',
    category: CATEGORY.OTHER,
<% if (type === 'js') { -%>
    visualization: VisController,
<% } -%>
    visConfig: {
      defaults: {
        // add default parameters
        fontSize: '50'
      },
<% if (type === 'angular') { -%>
      template: visTemplate,
<% } -%>
<% if (editor === 'react') { -%>
      component: visComponent,
<% } -%>
    },
<% if (editor === 'custom') { -%>
    editor: EditorController,
<% } -%>
<% if (editor !== 'custom') { -%>
    editor: '<%= editor %>',
<% } -%>
    editorConfig: {
<% if (editor === 'default') { -%>
      optionsTemplate: optionsTemplate,
<% } -%>
<% if (editor === 'default') { -%>
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          aggFilter: ['!derivative', '!geo_centroid'],
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }
      ]),
<% } -%>
    },
<% if (request_handler === 'custom') { -%>
    requestHandler: requestHandler,
<% } -%>
<% if (request_handler !== 'custom') { -%>
    requestHandler: '<%= request_handler %>',
<% } -%>
<% if (response_handler === 'custom') { -%>
    responseHandler: responseHandler,
<% } -%>
<% if (response_handler !== 'custom') { -%>
    responseHandler: '<%= response_handler %>',
<% } -%>
  });
}

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(<%= vis_provider %>);

// export the provider so that the visType can be required with Private()
export default <%= vis_provider %>;
