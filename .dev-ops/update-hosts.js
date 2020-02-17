const fs = require("fs");
const path = require("path");

const { argv } = process;

console.log('IMPORTANT! You shoud run this command with "sudo"');

const getDockerComposeFile = () => {
  let file = argv.filter((arg, index) => argv[index - 1] === "-f")[0];
  return fs.readFileSync(path.resolve(__dirname, "../", file), "utf-8");
};

const getHostsFromTraefikConfig = config => {
  return config
    .match(/traefik.frontend.rule=Host:([a-z.\-_0-9]+)/gm)
    .map(match => match.split("Host:")[1]);
};

const updateDynamicHosts = (hosts, newHosts) => {
  const common = `of dynamic hosts for ${__dirname}`;
  const updatedHosts = hosts.replace(
    new RegExp(`(\n\n|\n|)## BEGIN ${common}(.|\n)+## END ${common}`, "gm"),
    ""
  );
  const hostsText = "127.0.0.1 " + newHosts.join("\n127.0.0.1 ");
  const text = `${updatedHosts}\n\n## BEGIN ${common}\n${hostsText}\n## END ${common}`;
  fs.writeFileSync("/etc/hosts", text, "utf-8")
};

const etcHosts = fs.readFileSync("/etc/hosts", "utf-8");
const dockerComposeFile = getDockerComposeFile();
const newTraeficHosts = getHostsFromTraefikConfig(dockerComposeFile);
updateDynamicHosts(etcHosts, newTraeficHosts);

console.log(__dirname);

console.log(newTraeficHosts);
