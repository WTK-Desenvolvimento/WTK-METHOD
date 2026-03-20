const path = require('node:path');
const fs = require('fs-extra');
const { toColonPath, toDashPath, customAgentColonName, customAgentDashName, WTK_FOLDER_NAME } = require('./path-utils');

/**
 * Generates launcher command files for each agent
 * Similar to WorkflowCommandGenerator but for agents
 */
class AgentCommandGenerator {
  constructor(wtkFolderName = WTK_FOLDER_NAME) {
    this.templatePath = path.join(__dirname, '../templates/agent-command-template.md');
    this.wtkFolderName = wtkFolderName;
  }

  /**
   * Collect agent artifacts for IDE installation
   * @param {string} wtkDir - WTK installation directory
   * @param {Array} selectedModules - Modules to include
   * @returns {Object} Artifacts array with metadata
   */
  async collectAgentArtifacts(wtkDir, selectedModules = []) {
    const { getAgentsFromWtk } = require('./wtk-artifacts');

    // Get agents from INSTALLED bmad/ directory
    const agents = await getAgentsFromWtk(wtkDir, selectedModules);

    const artifacts = [];

    for (const agent of agents) {
      const launcherContent = await this.generateLauncherContent(agent);
      // Use relativePath if available (for nested agents), otherwise just name with .md
      const agentPathInModule = agent.relativePath || `${agent.name}.md`;
      // Calculate the relative agent path (e.g., bmm/agents/pm.md)
      let agentRelPath = agent.path || '';
      // Normalize path separators for cross-platform compatibility
      agentRelPath = agentRelPath.replaceAll('\\', '/');
      // Remove _wtk/ prefix if present to get relative path from project root
      // Handle both absolute paths (/path/to/_wtk/...) and relative paths (_wtk/...)
      if (agentRelPath.includes('_wtk/')) {
        const parts = agentRelPath.split(/_wtk\//);
        if (parts.length > 1) {
          agentRelPath = parts.slice(1).join('/');
        }
      }
      artifacts.push({
        type: 'agent-launcher',
        name: agent.name,
        description: agent.description || `${agent.name} agent`,
        module: agent.module,
        canonicalId: agent.canonicalId || '',
        relativePath: path.join(agent.module, 'agents', agentPathInModule), // For command filename
        agentPath: agentRelPath, // Relative path to actual agent file
        content: launcherContent,
        sourcePath: agent.path,
      });
    }

    return {
      artifacts,
      counts: {
        agents: agents.length,
      },
    };
  }

  /**
   * Generate launcher content for an agent
   * @param {Object} agent - Agent metadata
   * @returns {string} Launcher file content
   */
  async generateLauncherContent(agent) {
    // Load the template
    const template = await fs.readFile(this.templatePath, 'utf8');

    // Replace template variables
    // Use relativePath if available (for nested agents), otherwise just name with .md
    const agentPathInModule = agent.relativePath || `${agent.name}.md`;
    return template
      .replaceAll('{{name}}', agent.name)
      .replaceAll('{{module}}', agent.module)
      .replaceAll('{{path}}', agentPathInModule)
      .replaceAll('{{description}}', agent.description || `${agent.name} agent`)
      .replaceAll('_wtk', this.wtkFolderName);
  }

  /**
   * Write agent launcher artifacts to IDE commands directory
   * @param {string} baseCommandsDir - Base commands directory for the IDE
   * @param {Array} artifacts - Agent launcher artifacts
   * @returns {number} Count of launchers written
   */
  async writeAgentLaunchers(baseCommandsDir, artifacts) {
    let writtenCount = 0;

    for (const artifact of artifacts) {
      if (artifact.type === 'agent-launcher') {
        const moduleAgentsDir = path.join(baseCommandsDir, artifact.module, 'agents');
        await fs.ensureDir(moduleAgentsDir);

        const launcherPath = path.join(moduleAgentsDir, `${artifact.name}.md`);
        await fs.writeFile(launcherPath, artifact.content);
        writtenCount++;
      }
    }

    return writtenCount;
  }

  /**
   * Write agent launcher artifacts using underscore format (Windows-compatible)
   * Creates flat files like: bmad_bmm_pm.md
   *
   * @param {string} baseCommandsDir - Base commands directory for the IDE
   * @param {Array} artifacts - Agent launcher artifacts
   * @returns {number} Count of launchers written
   */
  async writeColonArtifacts(baseCommandsDir, artifacts) {
    let writtenCount = 0;

    for (const artifact of artifacts) {
      if (artifact.type === 'agent-launcher') {
        // Convert relativePath to underscore format: bmm/agents/pm.md → bmad_bmm_pm.md
        const flatName = toColonPath(artifact.relativePath);
        const launcherPath = path.join(baseCommandsDir, flatName);
        await fs.ensureDir(path.dirname(launcherPath));
        await fs.writeFile(launcherPath, artifact.content);
        writtenCount++;
      }
    }

    return writtenCount;
  }

  /**
   * Write agent launcher artifacts using dash format (NEW STANDARD)
   * Creates flat files like: wtk-agent-bmm-pm.md
   *
   * The wtk-agent- prefix distinguishes agents from workflows/tasks/tools.
   *
   * @param {string} baseCommandsDir - Base commands directory for the IDE
   * @param {Array} artifacts - Agent launcher artifacts
   * @returns {number} Count of launchers written
   */
  async writeDashArtifacts(baseCommandsDir, artifacts) {
    let writtenCount = 0;

    for (const artifact of artifacts) {
      if (artifact.type === 'agent-launcher') {
        // Convert relativePath to dash format: bmm/agents/pm.md → wtk-agent-bmm-pm.md
        const flatName = toDashPath(artifact.relativePath);
        const launcherPath = path.join(baseCommandsDir, flatName);
        await fs.ensureDir(path.dirname(launcherPath));
        await fs.writeFile(launcherPath, artifact.content);
        writtenCount++;
      }
    }

    return writtenCount;
  }

  /**
   * Get the custom agent name in underscore format (Windows-compatible)
   * @param {string} agentName - Custom agent name
   * @returns {string} Underscore-formatted filename
   */
  getCustomAgentColonName(agentName) {
    return customAgentColonName(agentName);
  }

  /**
   * Get the custom agent name in underscore format (Windows-compatible)
   * @param {string} agentName - Custom agent name
   * @returns {string} Underscore-formatted filename
   */
  getCustomAgentDashName(agentName) {
    return customAgentDashName(agentName);
  }
}

module.exports = { AgentCommandGenerator };
