// Editorial content for each engineering discipline. These describe service approaches, not client results.
export const engineeringContent = {
 'ai-engineering': {
  headline:'Move from AI ideas to useful workflows.', overview:'The best AI feature begins with a specific job to be done. We help identify where models, retrieval, and automation can support people and fit into an existing product or operation.',
  approach:'We start with a practical use case and the available data, then shape an integration that considers reliability, human review, privacy, and how the system will be evaluated over time.',
  offerings:[['AI opportunity discovery','Define the users, workflow, constraints, and success criteria before selecting a solution.'],['Model and API integration','Connect appropriate model services to applications and existing business processes.'],['Knowledge-assisted experiences','Organise retrieval and source context so users can explore relevant information.'],['Evaluation and safeguards','Plan test cases, review paths, and monitoring for behaviour that needs attention.']],
  steps:['Frame the use case and baseline','Prototype against representative examples','Integrate with product workflows','Evaluate, monitor, and refine'],
  questions:[['Can AI be added to an existing product?','Yes. The right approach depends on the existing architecture, data access, user journey, and operational requirements.'],['How do you choose a model?','We assess the use case, output quality, latency, cost, data handling, and integration constraints together.']]
 },
 'full-stack-engineering': {
  headline:'Bring the whole product together.', overview:'A successful digital product needs an interface people enjoy using and a dependable system behind it. Full stack engineering connects those layers into a cohesive experience.',
  approach:'We work from the user journey through application architecture, data, APIs, and deployment. Decisions are made with maintainability, performance, and the product’s next stage in mind.',
  offerings:[['Front-end applications','Build responsive interfaces and reusable components for everyday workflows.'],['Back-end services','Develop application logic, APIs, and integrations that support product features.'],['Data and integrations','Connect the information and third-party services your workflows depend on.'],['Release and improvement','Prepare delivery workflows and refine the product as requirements change.']],
  steps:['Map product needs and architecture','Design interfaces and data flows','Build, integrate, and test','Launch and iterate'],
  questions:[['Can you work with an existing codebase?','Yes. An initial review helps identify constraints, priorities, and a sensible path for changes.'],['Do you handle both the interface and server?','Full stack work can cover both, with scope agreed around the product and team.']]
 },
 'mobile-engineering': {
  headline:'Create mobile experiences people return to.', overview:'A useful mobile app makes its most important tasks feel natural on a small screen. We bring product thinking and engineering together for iOS and Android experiences.',
  approach:'We consider the audience, device capabilities, connectivity, accessibility, and ongoing maintenance before choosing a native or cross-platform approach.',
  offerings:[['Mobile product planning','Prioritise user journeys, device needs, and an achievable first release.'],['Application development','Build mobile experiences for iOS, Android, or a shared cross-platform codebase.'],['Service integration','Connect accounts, APIs, notifications, and other supporting services as needed.'],['Release and iteration','Prepare for distribution and plan improvements based on feedback.']],
  steps:['Define the mobile journey','Choose the platform approach','Build and test on devices','Prepare release and improvements'],
  questions:[['Should my app be native or cross-platform?','The decision depends on device features, performance, audience, budget, and the skills needed to maintain it.'],['Can an existing website support the app?','Often an app can use existing APIs or services; we first review how those systems expose data and functionality.']]
 },
 'web-engineering': {
  headline:'Build a better experience on the web.', overview:'From a company website to a complex web application, we create responsive experiences that help visitors understand, decide, and get things done.',
  approach:'We align content, design, and development around the people using the site. Accessibility, performance, search visibility, and maintainability are considered throughout the build.',
  offerings:[['Corporate and marketing websites','Create clear, responsive sites that communicate your offer and make the next step easy.'],['Web applications and portals','Build task-focused experiences for customers, teams, or partners.'],['Commerce and integrations','Connect product, payment, content, or operational systems where needed.'],['Performance and accessibility','Review loading, responsive behaviour, and usability across devices.']],
  steps:['Understand audience and goals','Plan content and experience','Develop and integrate','Test, launch, and improve'],
  questions:[['Can you redesign an existing website?','Yes. We can review the current site, identify priorities, and plan the redesign around its content and technical constraints.'],['Will the site work on phones?','Responsive layouts and testing across screen sizes are part of the web development approach.']]
 },
 'backend-engineering': {
  headline:'Give your product a dependable foundation.', overview:'Back-end systems connect data, business rules, and services behind an application. We design those foundations around the workflows and demands they need to support.',
  approach:'We examine boundaries, data ownership, integrations, and operational needs before implementing services. Clear interfaces and observability make systems easier to evolve and support.',
  offerings:[['API design and development','Create interfaces that connect applications, services, and external systems.'],['Business logic and workflows','Implement the rules and processes behind product features.'],['Data architecture','Plan storage, access patterns, and movement of information across services.'],['Reliability and observability','Consider failure handling, logging, and visibility into system behaviour.']],
  steps:['Map the system and data','Design interfaces and boundaries','Implement and integrate services','Test operational scenarios'],
  questions:[['Can you integrate existing APIs?','Yes. We review the available documentation, access, data contracts, and failure cases before integration.'],['Can you modernize an existing back end?','A review of the current architecture and business priorities helps determine whether to improve, replace, or gradually migrate components.']]
 },
 'devops-engineering': {
  headline:'Make delivery a repeatable practice.', overview:'DevOps connects the way teams build, release, and operate software. We help make delivery workflows clearer and infrastructure easier to manage.',
  approach:'We start with the existing release process and operational risks, then identify where automation, configuration, and monitoring can remove friction without hiding important decisions.',
  offerings:[['CI/CD workflows','Structure build, test, and deployment steps around the team’s release process.'],['Cloud and infrastructure','Plan environments and infrastructure configurations for the application.'],['Operational visibility','Create a considered approach to logs, monitoring, and alerts.'],['Release improvement','Review handoffs, recovery procedures, and opportunities for automation.']],
  steps:['Review the current workflow','Identify delivery bottlenecks','Implement and document improvements','Measure and refine'],
  questions:[['Can you improve our existing pipeline?','Yes. We can assess the current workflow and prioritise changes around reliability and team needs.'],['Which cloud provider should we choose?','That depends on the application, existing investments, operational skills, budget, and constraints.']]
 },
 'ui-ux-engineering': {
  headline:'Make the interface work as well as it looks.', overview:'UI/UX engineering bridges design and implementation. It turns interaction patterns into responsive, accessible components people can use consistently.',
  approach:'We work through the complete interaction: states, content, keyboard use, screen sizes, and the details that connect a design system to a real product.',
  offerings:[['Responsive interface development','Translate layouts into experiences that adapt to different screens.'],['Accessible interactions','Consider semantic structure, keyboard use, focus, and readable content.'],['Component systems','Build reusable interface pieces and document how they fit together.'],['Interaction refinement','Handle loading, empty, error, and feedback states alongside the happy path.']],
  steps:['Review journeys and designs','Define components and states','Implement responsive interactions','Test and refine'],
  questions:[['Can you implement an existing design?','Yes. Reviewing the design, states, content, and technical context helps identify what is ready and what needs decisions.'],['Do you consider accessibility?','We incorporate accessibility considerations during design and development and can agree on specific testing needs for the project.']]
 },
 'design-engineering': {
  headline:'Connect product thinking to craft.', overview:'Design engineering helps teams move between an idea, an interactive prototype, and a production interface without losing the intent behind the experience.',
  approach:'We use prototypes and reusable patterns to make decisions tangible early. Designers and engineers can then collaborate around real interactions, constraints, and feedback.',
  offerings:[['Experience direction','Define the problem, audience, and principles guiding the experience.'],['Interactive prototypes','Make key journeys tangible so teams can discuss and evaluate them.'],['Design system foundations','Define patterns and components that support consistency.'],['Design-to-build collaboration','Resolve interaction and implementation details throughout delivery.']],
  steps:['Explore the problem','Shape the experience','Prototype and validate','Build and evolve the system'],
  questions:[['Can you help before development starts?','Yes. Discovery and prototypes can clarify the scope and important decisions before a full build.'],['Do we need a complete design system?','Not always. A focused set of reusable patterns can be a practical starting point.']]
 },
 'qa-engineering': {
  headline:'Make quality visible throughout delivery.', overview:'Quality assurance is more than a final checklist. It helps a team understand risks, validate important workflows, and release with better information.',
  approach:'We identify the product’s critical journeys and failure modes, then plan appropriate checks across features, integrations, devices, and release stages.',
  offerings:[['Test planning','Define scope, priorities, scenarios, and the information needed for release decisions.'],['Functional testing','Check that important product workflows behave as intended.'],['Cross-device review','Review relevant browsers, screen sizes, or devices for the product.'],['Regression and release support','Revisit critical paths as features and integrations change.']],
  steps:['Understand critical journeys','Prioritise risks and scenarios','Execute and communicate findings','Recheck fixes and release readiness'],
  questions:[['Do you only test at the end?','Quality is more useful when it is considered throughout delivery, with checks matched to the stage and risk.'],['Can testing cover an existing product?','Yes. We can begin by identifying the workflows and environments that matter most.']]
 },
 'iot-engineering': {
  headline:'Connect devices, data, and useful experiences.', overview:'Connected products bring physical devices and software together. We explore how device information can support a clear user or operational need.',
  approach:'The work begins with the device environment, connectivity, data flow, and responsibilities across the system. Integration choices should account for real-world conditions and the people using the information.',
  offerings:[['Connected product discovery','Define the use case, devices, stakeholders, and operating context.'],['Device data integration','Plan how information moves between devices, services, and applications.'],['Monitoring experiences','Design interfaces that help people understand and act on device information.'],['System integration','Connect the connected-product workflow with existing software where appropriate.']],
  steps:['Define the physical and digital journey','Map connectivity and data flows','Build the application integration','Validate against real-world scenarios'],
  questions:[['Can you connect existing devices?','It depends on the device interfaces, documentation, connectivity, and access available for the project.'],['Do you manufacture hardware?','Our scope is agreed around the project; contact us to discuss your device and software requirements.']]
 },
 'business-analysis': {
  headline:'Turn complex needs into a clear direction.', overview:'Business analysis helps teams understand the problem, align stakeholders, and make better decisions about what to build and why.',
  approach:'We bring people, processes, requirements, and constraints into view. The result is a shared basis for prioritising scope and planning delivery.',
  offerings:[['Discovery and stakeholder alignment','Explore goals, users, constraints, and the questions that need answers.'],['Requirements definition','Describe the capabilities, rules, and acceptance needs of the solution.'],['Process and journey mapping','Make current workflows and opportunities for change easier to see.'],['Scope and prioritisation','Organise work around value, dependencies, and practical delivery stages.']],
  steps:['Listen to stakeholders','Map the problem and process','Define and prioritise requirements','Align the delivery plan'],
  questions:[['Can business analysis help with an existing project?','Yes. It can help clarify changing requirements, decision points, and alignment within an ongoing initiative.'],['What should we prepare for discovery?','Existing goals, process documents, examples, and access to relevant stakeholders are helpful starting points.']]
 }
};
