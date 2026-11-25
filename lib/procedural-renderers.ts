export interface PlaygroundState {
  // 0: MGD
  confThreshold: number;
  showVectors: boolean;
  // 1: Disease-Gene
  relationConfidence: number;
  selectedEntity: string;
  // 2: IBM Data Mesh
  cadence: number;
  burstPackets: { edge: number; p: number }[];
  // 3: Thallus
  simulationRound: number;
  populationSize: number;
  polarization: number;
  // 4: Pluto
  activeNode: number;
  executionProgress: number;
  // 5: PrivateRAG
  userRole: 'ADMIN' | 'ANALYST' | 'AUDITOR';
  queryActive: boolean;
  // 6: Evolutionary
  generation: number;
  mutationRate: number;
  // Common mouse coordinates in canvas
  localMouseX: number;
  localMouseY: number;
}

export const INITIAL_PG_STATE: PlaygroundState = {
  confThreshold: 0.65,
  showVectors: true,
  relationConfidence: 0.7,
  selectedEntity: 'ALL',
  cadence: 1.0,
  burstPackets: [],
  simulationRound: 1,
  populationSize: 24,
  polarization: 0.38,
  activeNode: 0,
  executionProgress: 0,
  userRole: 'ANALYST',
  queryActive: true,
  generation: 42,
  mutationRate: 0.05,
  localMouseX: -999,
  localMouseY: -999
};

export function renderProjectSimulation(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  projectIdx: number,
  t: number,
  isPlayground: boolean,
  state: PlaygroundState
) {
  const time = t * 0.001;

  // Background
  ctx.fillStyle = '#0B0B0C';
  ctx.fillRect(0, 0, w, h);

  // Micro-grid
  ctx.strokeStyle = 'rgba(240, 237, 230, 0.05)';
  ctx.lineWidth = 1;
  const gStep = isPlayground ? 36 : 24;
  for (let x = gStep; x < w; x += gStep) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = gStep; y < h; y += gStep) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // -------------------------------------------------------------
  // 0: MGD OCULAR MORPHOMETRICS AI
  // -------------------------------------------------------------
  if (projectIdx === 0) {
    const thresh = isPlayground ? state.confThreshold : 0.6;
    const showVec = isPlayground ? state.showVectors : true;

    // Eyelid ROI boundary arch
    ctx.beginPath();
    ctx.moveTo(w * 0.12, h * 0.8);
    ctx.bezierCurveTo(w * 0.28, h * 0.12, w * 0.72, h * 0.12, w * 0.88, h * 0.8);
    ctx.quadraticCurveTo(w * 0.5, h * 0.9, w * 0.12, h * 0.8);
    ctx.strokeStyle = 'rgba(240, 237, 230, 0.28)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.setLineDash([]);

    // 12 procedural meibomian glands
    const glandCount = 12;
    let healthyCount = 0;
    for (let i = 0; i < glandCount; i++) {
      const frac = (i + 0.5) / glandCount;
      const gx = w * (0.2 + frac * 0.6);
      const archTop = h * (0.28 + Math.pow((frac - 0.5) * 2, 2) * 0.26);
      const archBot = h * 0.78;
      const conf = 0.42 + Math.abs(Math.sin(i * 1.6 + 0.4)) * 0.55;
      const active = conf >= thresh;
      if (active) healthyCount++;

      ctx.beginPath();
      const steps = 14;
      for (let s = 0; s <= steps; s++) {
        const p = s / steps;
        const y = archTop + (archBot - archTop) * p;
        const bend =
          Math.sin(p * Math.PI * 2.4 + i + time * 0.8) * (isPlayground ? 7 : 4.5);
        const x = gx + bend;
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = active
        ? 'rgba(255, 59, 0, 0.88)'
        : 'rgba(240, 237, 230, 0.14)';
      ctx.lineWidth = active ? (isPlayground ? 5.5 : 3.5) : 2;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Tortuosity vector overlay
      if (active && showVec) {
        ctx.beginPath();
        ctx.moveTo(gx, archTop);
        ctx.lineTo(gx, archBot);
        ctx.strokeStyle = 'rgba(240, 237, 230, 0.45)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    // Scanning horizontal laser reticle
    const scanY = h * 0.18 + ((Math.sin(time * 1.6) + 1) * 0.5) * (h * 0.64);
    ctx.beginPath();
    ctx.moveTo(w * 0.08, scanY);
    ctx.lineTo(w * 0.92, scanY);
    ctx.strokeStyle = 'rgba(255, 59, 0, 0.75)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Reticle crosshair details
    ctx.beginPath();
    ctx.arc(w * 0.5, scanY, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FF3B00';
    ctx.fill();

    if (isPlayground) {
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(240, 237, 230, 0.7)';
      ctx.fillText(`ATROPHY LOSS: ${(100 - (healthyCount / glandCount) * 100).toFixed(1)}%`, w * 0.1, h * 0.94);
    }
  }

  // -------------------------------------------------------------
  // 1: BIOMEDICAL DISEASE-GENE NLP & LITERATURE MINING
  // -------------------------------------------------------------
  else if (projectIdx === 1) {
    const geneNodes = [
      { id: 'BRCA1', x: w * 0.22, y: h * 0.3, type: 'GENE' },
      { id: 'TP53', x: w * 0.24, y: h * 0.7, type: 'GENE' },
      { id: 'APOE', x: w * 0.5, y: h * 0.22, type: 'GENE' },
      { id: 'EGFR', x: w * 0.78, y: h * 0.32, type: 'GENE' },
      { id: 'CFTR', x: w * 0.76, y: h * 0.72, type: 'GENE' }
    ];

    const diseaseNodes = [
      { id: 'CARCINOMA', x: w * 0.36, y: h * 0.52, type: 'DISEASE' },
      { id: 'ALZHEIMER', x: w * 0.64, y: h * 0.48, type: 'DISEASE' },
      { id: 'FIBROSIS', x: w * 0.62, y: h * 0.78, type: 'DISEASE' }
    ];

    const edges = [
      { from: geneNodes[0], to: diseaseNodes[0], conf: 0.94, label: 'MUTATION' },
      { from: geneNodes[1], to: diseaseNodes[0], conf: 0.88, label: 'OVEREXPR' },
      { from: geneNodes[2], to: diseaseNodes[1], conf: 0.92, label: 'ASSOCIATED' },
      { from: geneNodes[3], to: diseaseNodes[0], conf: 0.82, label: 'BIOMARKER' },
      { from: geneNodes[4], to: diseaseNodes[2], conf: 0.96, label: 'PATHOGENIC' },
      { from: diseaseNodes[0], to: diseaseNodes[1], conf: 0.65, label: 'COMORBID' }
    ];

    // Draw relation arcs
    edges.forEach((edge, idx) => {
      const active = edge.conf >= (isPlayground ? state.relationConfidence : 0.65);
      ctx.beginPath();
      ctx.moveTo(edge.from.x, edge.from.y);
      ctx.quadraticCurveTo(
        (edge.from.x + edge.to.x) / 2 + Math.sin(time + idx) * 12,
        (edge.from.y + edge.to.y) / 2 - 14,
        edge.to.x,
        edge.to.y
      );
      ctx.strokeStyle = active ? 'rgba(255, 59, 0, 0.65)' : 'rgba(240, 237, 230, 0.12)';
      ctx.lineWidth = active ? 1.6 : 0.8;
      ctx.stroke();

      // Traveling text attention packet
      if (active) {
        const p = (time * 0.6 + idx * 0.3) % 1;
        const px = edge.from.x + (edge.to.x - edge.from.x) * p;
        const py = edge.from.y + (edge.to.y - edge.from.y) * p;
        ctx.beginPath();
        ctx.arc(px, py, isPlayground ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FF3B00';
        ctx.fill();
      }
    });

    // Draw all nodes
    [...geneNodes, ...diseaseNodes].forEach((n) => {
      const isGene = n.type === 'GENE';
      ctx.beginPath();
      ctx.arc(n.x, n.y, isPlayground ? 12 : 7, 0, Math.PI * 2);
      ctx.fillStyle = isGene ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 59, 0, 0.25)';
      ctx.strokeStyle = isGene ? '#38BDF8' : '#FF3B00';
      ctx.lineWidth = 1.2;
      ctx.fill();
      ctx.stroke();

      if (isPlayground) {
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#F0EDE6';
        ctx.textAlign = 'center';
        ctx.fillText(n.id, n.x, n.y + 22);
      }
    });
  }

  // -------------------------------------------------------------
  // 2: ENTERPRISE DATA PLATFORMS @ IBM (Snowflake Snapshot Topology)
  // -------------------------------------------------------------
  else if (projectIdx === 2) {
    const nodes = [
      { x: w * 0.14, y: h * 0.3, label: 'SRC-AWS' },
      { x: w * 0.14, y: h * 0.7, label: 'SRC-DB2' },
      { x: w * 0.4, y: h * 0.5, label: 'GOV-SNOW', accent: true },
      { x: w * 0.66, y: h * 0.32, label: 'SNAP-01' },
      { x: w * 0.66, y: h * 0.68, label: 'SNAP-02' },
      { x: w * 0.88, y: h * 0.5, label: 'DATABRICKS' }
    ];
    const edges = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5]];

    edges.forEach(([a, b], idx) => {
      const n1 = nodes[a];
      const n2 = nodes[b];
      ctx.beginPath();
      ctx.moveTo(n1.x, n1.y);
      ctx.lineTo(n2.x, n2.y);
      ctx.strokeStyle = 'rgba(240, 237, 230, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Continuous pulsing packets
      const speed = isPlayground ? state.cadence : 0.9;
      const p = (time * 0.55 * speed + idx * 0.23) % 1;
      const px = n1.x + (n2.x - n1.x) * p;
      const py = n1.y + (n2.y - n1.y) * p;
      ctx.beginPath();
      ctx.arc(px, py, isPlayground ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = idx % 2 === 0 ? '#FF3B00' : '#F0EDE6';
      ctx.fill();
    });

    // Injected burst packets in playground
    if (isPlayground && state.burstPackets.length > 0) {
      for (let i = state.burstPackets.length - 1; i >= 0; i--) {
        const bp = state.burstPackets[i];
        bp.p += 0.025 * state.cadence;
        if (bp.p >= 1) {
          state.burstPackets.splice(i, 1);
          continue;
        }
        const [a, b] = edges[bp.edge % edges.length];
        const n1 = nodes[a];
        const n2 = nodes[b];
        const px = n1.x + (n2.x - n1.x) * bp.p;
        const py = n1.y + (n2.y - n1.y) * bp.p;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FF3B00';
        ctx.fill();
      }
    }

    // Concentric zero-copy snapshot rings
    nodes.forEach((n) => {
      const pulse = 1 + Math.sin(time * 3 + n.x) * 0.12;
      ctx.beginPath();
      ctx.arc(n.x, n.y, (isPlayground ? 16 : 10) * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = n.accent
        ? 'rgba(255, 59, 0, 0.45)'
        : 'rgba(240, 237, 230, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(n.x, n.y, isPlayground ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = n.accent ? '#FF3B00' : '#F0EDE6';
      ctx.fill();

      if (isPlayground) {
        ctx.fillStyle = 'rgba(240, 237, 230, 0.72)';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + 28);
      }
    });
  }

  // -------------------------------------------------------------
  // 3: THALLUS — MULTI-AGENT SOCIAL SIMULATION ENGINE
  // -------------------------------------------------------------
  else if (projectIdx === 3) {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const round = state.simulationRound;

    // Central Knowledge Graph Document Core
    ctx.beginPath();
    ctx.arc(cx, cy, isPlayground ? 28 : 18, 0, Math.PI * 2);
    ctx.strokeStyle = '#FF3B00';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 59, 0, 0.15)';
    ctx.fill();

    // Concentric simulation round waves
    const waves = 3;
    for (let i = 0; i < waves; i++) {
      const r = ((time * 30 + i * 45) % (Math.min(w, h) * 0.44));
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 59, 0, ${0.4 - (r / (Math.min(w, h) * 0.44)) * 0.38})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Agent population ring
    const agentCount = isPlayground ? state.populationSize : 16;
    const orbitR = Math.min(w, h) * 0.36;

    for (let a = 0; a < agentCount; a++) {
      const ang = (a / agentCount) * Math.PI * 2 + time * 0.15;
      const ax = cx + Math.cos(ang) * orbitR;
      const ay = cy + Math.sin(ang) * orbitR;

      // Connections between neighboring agents
      const nextAng = ((a + 1) / agentCount) * Math.PI * 2 + time * 0.15;
      const nx = cx + Math.cos(nextAng) * orbitR;
      const ny = cy + Math.sin(nextAng) * orbitR;

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = 'rgba(240, 237, 230, 0.15)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Message pulse from core
      if (a % 3 === 0) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ax, ay);
        ctx.strokeStyle = 'rgba(255, 59, 0, 0.35)';
        ctx.stroke();
      }

      // Agent persona dot
      ctx.beginPath();
      ctx.arc(ax, ay, isPlayground ? 4 : 2.5, 0, Math.PI * 2);
      const isPolarized = (a + round) % 2 === 0;
      ctx.fillStyle = isPolarized ? '#FF3B00' : '#38BDF8';
      ctx.fill();
    }

    if (isPlayground) {
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#F0EDE6';
      ctx.textAlign = 'center';
      ctx.fillText(`THALLUS CORE`, cx, cy - 4);
      ctx.fillText(`ROUND ${round}`, cx, cy + 10);
    }
  }

  // -------------------------------------------------------------
  // 4: PLUTO — VISUAL ML PIPELINE BLUEPRINTS
  // -------------------------------------------------------------
  else if (projectIdx === 4) {
    const nodeWidth = isPlayground ? 105 : 68;
    const nodeHeight = isPlayground ? 65 : 44;

    const pipelineNodes = [
      { name: 'DataLoader', x: w * 0.12, y: h * 0.4 },
      { name: 'FeatureScale', x: w * 0.38, y: h * 0.28 },
      { name: 'SegModel', x: w * 0.64, y: h * 0.48 },
      { name: 'PyExport', x: w * 0.86, y: h * 0.36 }
    ];

    // Draw bezier blueprint connection wires
    for (let i = 0; i < pipelineNodes.length - 1; i++) {
      const n1 = pipelineNodes[i];
      const n2 = pipelineNodes[i + 1];
      const startX = n1.x + nodeWidth;
      const startY = n1.y + nodeHeight * 0.5;
      const endX = n2.x;
      const endY = n2.y + nodeHeight * 0.5;
      const midX = (startX + endX) / 2;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(midX, startY, midX, endY, endX, endY);
      ctx.strokeStyle = 'rgba(240, 237, 230, 0.35)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Execution pulse along wire
      const p = (time * 0.8 + i * 0.3) % 1;
      const tA = 1 - p;
      const px =
        tA * tA * tA * startX +
        3 * tA * tA * p * midX +
        3 * tA * p * p * midX +
        p * p * p * endX;
      const py =
        tA * tA * tA * startY +
        3 * tA * tA * p * startY +
        3 * tA * p * p * endY +
        p * p * p * endY;

      ctx.beginPath();
      ctx.arc(px, py, isPlayground ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FF3B00';
      ctx.fill();
    }

    // Draw blueprint node boxes
    pipelineNodes.forEach((n, idx) => {
      ctx.fillStyle = '#141417';
      ctx.fillRect(n.x, n.y, nodeWidth, nodeHeight);

      // Node header
      ctx.fillStyle = idx === 2 ? '#FF3B00' : 'rgba(240, 237, 230, 0.18)';
      ctx.fillRect(n.x, n.y, nodeWidth, isPlayground ? 18 : 12);

      ctx.strokeStyle = 'rgba(240, 237, 230, 0.32)';
      ctx.lineWidth = 1;
      ctx.strokeRect(n.x, n.y, nodeWidth, nodeHeight);

      // Node pin dots
      ctx.beginPath();
      ctx.arc(n.x, n.y + nodeHeight * 0.5, 3, 0, Math.PI * 2);
      ctx.arc(n.x + nodeWidth, n.y + nodeHeight * 0.5, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#38BDF8';
      ctx.fill();

      if (isPlayground) {
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(n.name, n.x + nodeWidth * 0.5, n.y + 13);
        ctx.fillStyle = 'rgba(240, 237, 230, 0.6)';
        ctx.fillText('OUTPUT: OK', n.x + nodeWidth * 0.5, n.y + nodeHeight - 12);
      }
    });
  }

  // -------------------------------------------------------------
  // 5: ENTERPRISE PRIVATERAG PLATFORM (Granular RBAC Gateway)
  // -------------------------------------------------------------
  else if (projectIdx === 5) {
    const role = isPlayground ? state.userRole : 'ANALYST';
    const splitX = w * 0.48;

    // Left Side: Ingested Knowledge Base (Chunks)
    ctx.strokeStyle = 'rgba(240, 237, 230, 0.2)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(splitX, h * 0.12);
    ctx.lineTo(splitX, h * 0.88);
    ctx.stroke();
    ctx.setLineDash([]);

    // Document Chunks in 2D space
    const chunks = 16;
    for (let c = 0; c < chunks; c++) {
      const cx = w * 0.12 + (c % 4) * (w * 0.08);
      const cy = h * 0.22 + Math.floor(c / 4) * (h * 0.16);

      const requiresAdmin = c >= 10;
      const isAllowed = role === 'ADMIN' ? true : !requiresAdmin;

      ctx.beginPath();
      ctx.rect(cx - 8, cy - 8, 16, 16);
      ctx.fillStyle = isAllowed ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 59, 0, 0.25)';
      ctx.strokeStyle = isAllowed ? '#38BDF8' : '#FF3B00';
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    }

    // Right Side: Query Agent & Retrieval Wave
    const qx = w * 0.78;
    const qy = h * 0.5;

    ctx.beginPath();
    ctx.arc(qx, qy, isPlayground ? 18 : 12, 0, Math.PI * 2);
    ctx.fillStyle = '#FF3B00';
    ctx.fill();

    // Retrieval radar wave
    const waveR = ((time * 40) % (w * 0.35));
    ctx.beginPath();
    ctx.arc(qx, qy, waveR, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 59, 0, ${0.5 - (waveR / (w * 0.35)) * 0.45})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    if (isPlayground) {
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#F0EDE6';
      ctx.textAlign = 'center';
      ctx.fillText(`ROLE GATE: [${role}]`, splitX, h * 0.08);
      ctx.fillText(`QUERY AGENT`, qx, qy + 32);
    }
  }

  // -------------------------------------------------------------
  // 6: EVOLUTIONARY ALGORITHMS & NEURAL AGENTS
  // -------------------------------------------------------------
  else {
    // Fitness Landscape curve
    ctx.beginPath();
    ctx.moveTo(w * 0.08, h * 0.85);
    for (let x = w * 0.08; x <= w * 0.92; x += 10) {
      const p = (x - w * 0.08) / (w * 0.84);
      const fit =
        Math.sin(p * Math.PI * 3 + time) * 18 +
        Math.cos(p * Math.PI * 5 - time * 0.8) * 12 -
        Math.pow(p - 0.7, 2) * (h * 0.4);
      const y = h * 0.75 + fit;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(240, 237, 230, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 6 Autonomous Neural Agents traversing path
    const agents = 6;
    for (let i = 0; i < agents; i++) {
      const p = ((time * 0.22 + i * 0.16) % 1);
      const ax = w * 0.1 + p * (w * 0.8);
      const ay = h * 0.45 + Math.sin(p * Math.PI * 4 + i) * (h * 0.18);

      // Genetic trail
      ctx.beginPath();
      ctx.moveTo(ax - 20, ay + Math.sin(time + i) * 8);
      ctx.lineTo(ax, ay);
      ctx.strokeStyle = i === 0 ? '#FF3B00' : 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = i === 0 ? 2 : 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(ax, ay, isPlayground ? 4.5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? '#FF3B00' : '#F0EDE6';
      ctx.fill();
    }

    if (isPlayground) {
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(240, 237, 230, 0.7)';
      ctx.textAlign = 'left';
      ctx.fillText(`GEN ${state.generation} · FITNESS PEAK 0.96`, w * 0.1, h * 0.18);
    }
  }
}
