/**
 * NetQuest
 * AI-assisted local network discovery tool built with Node.js and Nmap.
 *
 * Features:
 * - Subnet scanning
 * - Device enumeration
 * - MAC address detection
 * - Basic OS fingerprinting
 *
 * Author: Berke Topuklar
 * License: MIT
 */

const nmap = require('nmap');

// Default subnet range
const subnet = '192.168.1.0/24';

// Pre-scan warning (security + professionalism)
console.warn('Warning: This operation may require elevated privileges (sudo/root).\n');

const startTime = Date.now();

console.log(`Starting network scan on ${subnet}...`);
console.log(`Timestamp: ${new Date().toISOString()}\n`);

nmap.scan(subnet, (err, report) => {

  // Error handling
  if (err) {
    console.error('Scan failed:', err);
    return;
  }

  // Handle empty results
  if (!report.hosts || report.hosts.length === 0) {
    console.log('No devices found on the network.');
    return;
  }

  console.log('Scan completed.\n');

  // Iterate through discovered hosts
  for (const host of report.hosts) {

    console.log('-----------------------------');

    console.log(`IP Address : ${host.ip}`);
    console.log(`MAC Address: ${host.mac || 'Unknown'}`);
    console.log(`OS Detected: ${host.os || 'Unknown'}`);
  }

  // Summary
  console.log(`\nTotal devices discovered: ${report.hosts.length}`);

  // Performance report
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`Scan completed in ${duration}s`);
});