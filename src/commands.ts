import { Fetcher } from './types';
import { joinFetchers as join } from './utils/fetcher';

import { apt } from './fetchers/apt';
import { bashBuiltin } from './fetchers/bash-builtin';
import { brew } from './fetchers/brew';
import { bundler } from './fetchers/bundler';
import { daemontools } from './fetchers/daemontools';
import { docker } from './fetchers/docker';
import { ffmpeg } from './fetchers/ffmpeg';
import { fzf } from './fetchers/fzf';
import { gem } from './fetchers/gem';
import { git } from './fetchers/git';
import { gnuCoreutils } from './fetchers/gnu-coreutils';
import { go } from './fetchers/go';
import { graphviz } from './fetchers/graphviz';
import { htop } from './fetchers/htop';
import { imagemagick } from './fetchers/imagemagick';
import { jq } from './fetchers/jq';
import { mysql } from './fetchers/mysql';
import { openbsd } from './fetchers/openbsd';
import { perl } from './fetchers/perl';
import { python } from './fetchers/python';
import { rsync } from './fetchers/rsync';
import { sshuttle } from './fetchers/sshuttle';
import { terraform } from './fetchers/terraform';
import { yarn } from './fetchers/yarn';

export const baseCommandToFetcher = new Map<string, Fetcher>([
  ['alias', bashBuiltin.alias],
  ['apropos', openbsd.apropos],
  ['apt-cache', apt.aptCache],
  ['apt-get', apt.aptGet],
  ['arch', gnuCoreutils.arch],
  ['awk', openbsd.awk],
  ['b2sum', gnuCoreutils.b2sum],
  ['base32', gnuCoreutils.base32],
  ['base64', gnuCoreutils.base64],
  ['basename', gnuCoreutils.basename],
  ['basenc', gnuCoreutils.basenc],
  ['bc', openbsd.bc],
  ['bg', bashBuiltin.bg],
  ['bind', bashBuiltin.bind],
  ['break', bashBuiltin.break],
  ['brew', brew],
  ['builtin', bashBuiltin.builtin],
  ['bundle', bundler.bundle],
  ['caller', bashBuiltin.caller],
  ['cat', gnuCoreutils.cat],
  ['cd', bashBuiltin.cd],
  ['chcon', gnuCoreutils.chcon],
  ['chflags', openbsd.chflags],
  ['chgrp', gnuCoreutils.chgrp],
  ['chio', openbsd.chio],
  ['chmod', gnuCoreutils.chmod],
  ['chown', gnuCoreutils.chown],
  ['chroot', gnuCoreutils.chroot],
  ['cksum', gnuCoreutils.cksum],
  ['clear', openbsd.clear],
  ['column', openbsd.column],
  ['comm', gnuCoreutils.comm],
  ['command', bashBuiltin.command],
  ['compgen', bashBuiltin.compgen],
  ['complete', bashBuiltin.complete],
  ['compopt', bashBuiltin.compopt],
  ['compress', openbsd.compress],
  ['continue', bashBuiltin.continue],
  ['coreutils', gnuCoreutils.coreutils],
  ['cp', gnuCoreutils.cp],
  ['csh', openbsd.csh],
  ['csplit', gnuCoreutils.csplit],
  ['cut', gnuCoreutils.cut],
  ['date', gnuCoreutils.date],
  ['dc', openbsd.dc],
  ['dd', gnuCoreutils.dd],
  ['declare', bashBuiltin.declare],
  ['df', gnuCoreutils.df],
  ['diff', openbsd.diff],
  ['dig', openbsd.dig],
  ['dir', gnuCoreutils.dir],
  ['dirs', bashBuiltin.dirs],
  ['dircolors', gnuCoreutils.dircolors],
  ['dirname', gnuCoreutils.dirname],
  ['disown', bashBuiltin.disown],
  ['docker', docker],
  ['domainname', openbsd.domainname],
  ['dot', graphviz.dot],
  ['du', gnuCoreutils.du],
  ['echo', join(gnuCoreutils.echo, bashBuiltin.echo)],
  ['ed', openbsd.ed],
  ['eject', openbsd.eject],
  ['enable', bashBuiltin.enable],
  ['env', gnuCoreutils.env],
  ['eval', bashBuiltin.eval],
  ['exec', bashBuiltin.exec],
  ['exit', bashBuiltin.exit],
  ['expand', gnuCoreutils.expand],
  ['export', bashBuiltin.export],
  ['expr', gnuCoreutils.expr],
  ['factor', gnuCoreutils.factor],
  ['false', join(gnuCoreutils.false, bashBuiltin.false)],
  ['fc', bashBuiltin.fc],
  ['ffmpeg', ffmpeg.ffmpeg],
  ['ffplay', ffmpeg.ffplay],
  ['ffprobe', ffmpeg.ffprobe],
  ['fg', bashBuiltin.fg],
  ['file', openbsd.file],
  ['find', openbsd.find],
  ['finger', openbsd.finger],
  ['fmt', gnuCoreutils.fmt],
  ['fold', gnuCoreutils.fold],
  ['fstat', openbsd.fstat],
  ['fzf', fzf.fzf],
  ['fzf-tmux', fzf.fzfTmux],
  ['gem', gem],
  ['getopts', bashBuiltin.getopts],
  ['git', git],
  ['go', go],
  ['groups', gnuCoreutils.groups],
  ['gunzip', openbsd.gunzip],
  ['gzcat', openbsd.gzcat],
  ['gzip', openbsd.gzip],
  ['halt', openbsd.halt],
  ['hash', bashBuiltin.hash],
  ['head', gnuCoreutils.head],
  ['help', bashBuiltin.help],
  ['history', bashBuiltin.history],
  ['hostid', gnuCoreutils.hostid],
  ['hostname', gnuCoreutils.hostname],
  ['htop', htop],
  ['id', gnuCoreutils.id],
  ['ifconfig', openbsd.ifconfig],
  ['init', openbsd.init],
  ['inlib', bashBuiltin.inlib],
  ['install', gnuCoreutils.install],
  ['iostat', openbsd.iostat],
  ['jobs', bashBuiltin.jobs],
  ['join', gnuCoreutils.join],
  ['jq', jq],
  ['kill', join(gnuCoreutils.kill, bashBuiltin.kill)],
  ['ksh', openbsd.ksh],
  ['less', openbsd.less],
  ['let', bashBuiltin.let],
  ['link', gnuCoreutils.link],
  ['ln', gnuCoreutils.ln],
  ['local', bashBuiltin.local],
  ['login', openbsd.login],
  ['logname', gnuCoreutils.logname],
  ['logout', bashBuiltin.logout],
  ['ls', gnuCoreutils.ls],
  ['magick', imagemagick.magick],
  ['magick-script', imagemagick.magickScript],
  ['make', openbsd.make],
  ['man', openbsd.man],
  ['mandoc', openbsd.mandoc],
  ['mapfile', bashBuiltin.mapfile],
  ['md5', openbsd.md5],
  ['md5sum', gnuCoreutils.md5sum],
  ['mkdir', gnuCoreutils.mkdir],
  ['mkfifo', gnuCoreutils.mkfifo],
  ['mknod', gnuCoreutils.mknod],
  ['mktemp', gnuCoreutils.mktemp],
  ['more', openbsd.more],
  ['mt', openbsd.mt],
  ['mv', gnuCoreutils.mv],
  ['mysql', mysql.mysql],
  ['mysqladmin', mysql.mysqladmin],
  ['mysqlcheck', mysql.mysqlcheck],
  ['mysqldump', mysql.mysqldump],
  ['mysqlimport', mysql.mysqlimport],
  ['mysqlpump', mysql.mysqlpump],
  ['mysqlshow', mysql.mysqlshow],
  ['mysqlslap', mysql.mysqlslap],
  ['nc', openbsd.nc],
  ['netstat', openbsd.netstat],
  ['nice', gnuCoreutils.nice],
  ['nl', gnuCoreutils.nl],
  ['nohup', gnuCoreutils.nohup],
  ['nproc', gnuCoreutils.nproc],
  ['numfmt', gnuCoreutils.numfmt],
  ['od', gnuCoreutils.od],
  ['paste', gnuCoreutils.paste],
  ['patch', openbsd.patch],
  ['pathchk', gnuCoreutils.pathchk],
  ['pax', openbsd.pax],
  ['perl', perl],
  ['pgrep', openbsd.pgrep],
  ['ping', openbsd.ping],
  ['ping6', openbsd.ping6],
  ['pinky', gnuCoreutils.pinky],
  ['pkill', openbsd.pkill],
  ['popd', bashBuiltin.popd],
  ['pr', gnuCoreutils.pr],
  ['printenv', gnuCoreutils.printenv],
  ['printf', join(gnuCoreutils.printf, bashBuiltin.printf)],
  ['ps', openbsd.ps],
  ['ptx', gnuCoreutils.ptx],
  ['pushd', bashBuiltin.pushd],
  ['pwd', join(gnuCoreutils.pwd, bashBuiltin.pwd)],
  ['python', python],
  ['read', bashBuiltin.read],
  ['readarray', bashBuiltin.readarray],
  ['readlink', gnuCoreutils.readlink],
  ['readonly', bashBuiltin.readonly],
  ['realpath', gnuCoreutils.realpath],
  ['reboot', openbsd.reboot],
  ['renice', openbsd.renice],
  ['return', bashBuiltin.return],
  ['rev', openbsd.rev],
  ['rm', gnuCoreutils.rm],
  ['rmdir', gnuCoreutils.rmdir],
  ['route', openbsd.route],
  ['rsync', rsync],
  ['runcon', gnuCoreutils.runcon],
  ['scp', openbsd.scp],
  ['sed', openbsd.sed],
  ['seq', gnuCoreutils.seq],
  ['set', bashBuiltin.set],
  ['setlock', daemontools.setlock],
  ['sftp', openbsd.sftp],
  ['sh', openbsd.sh],
  ['sha1', openbsd.sha1],
  ['sha1sum', gnuCoreutils.sha1sum],
  ['sha224sum', gnuCoreutils.sha224sum],
  ['sha256', openbsd.sha256],
  ['sha256sum', gnuCoreutils.sha256sum],
  ['sha384sum', gnuCoreutils.sha384sum],
  ['sha512', openbsd.sha512],
  ['sha512sum', gnuCoreutils.sha512sum],
  ['shift', bashBuiltin.shift],
  ['shopt', bashBuiltin.shopt],
  ['shred', gnuCoreutils.shred],
  ['shuf', gnuCoreutils.shuf],
  ['shutdown', openbsd.shutdown],
  ['sleep', gnuCoreutils.sleep],
  ['softlimit', daemontools.softlimit],
  ['sort', gnuCoreutils.sort],
  ['source', bashBuiltin.source],
  ['split', gnuCoreutils.split],
  ['ssh', openbsd.ssh],
  ['sshuttle', sshuttle],
  ['stat', gnuCoreutils.stat],
  ['stdbuf', gnuCoreutils.stdbuf],
  ['strings', openbsd.strings],
  ['stty', gnuCoreutils.stty],
  ['sum', gnuCoreutils.sum],
  ['suspend', bashBuiltin.suspend],
  ['svc', daemontools.svc],
  ['sync', gnuCoreutils.sync],
  ['systat', openbsd.systat],
  ['tac', gnuCoreutils.tac],
  ['tail', gnuCoreutils.tail],
  ['tar', openbsd.tar],
  ['tee', gnuCoreutils.tee],
  ['terraform', terraform],
  ['test', join(gnuCoreutils.test, bashBuiltin.test)],
  ['time', bashBuiltin.time],
  ['timeout', gnuCoreutils.timeout],
  ['times', bashBuiltin.times],
  ['top', openbsd.top],
  ['touch', gnuCoreutils.touch],
  ['tput', openbsd.tput],
  ['tr', gnuCoreutils.tr],
  ['traceroute', openbsd.traceroute],
  ['traceroute6', openbsd.traceroute6],
  ['trap', bashBuiltin.trap],
  ['true', join(gnuCoreutils.true, bashBuiltin.true)],
  ['truncate', gnuCoreutils.truncate],
  ['tsort', gnuCoreutils.tsort],
  ['tty', gnuCoreutils.tty],
  ['type', bashBuiltin.type],
  ['typeset', bashBuiltin.typeset],
  ['ulimit', bashBuiltin.ulimit],
  ['umask', bashBuiltin.umask],
  ['unalias', bashBuiltin.unalias],
  ['uname', gnuCoreutils.uname],
  ['uncompress', openbsd.uncompress],
  ['unexpand', gnuCoreutils.unexpand],
  ['uniq', gnuCoreutils.uniq],
  ['unlink', gnuCoreutils.unlink],
  ['unset', bashBuiltin.unset],
  ['uptime', gnuCoreutils.uptime],
  ['users', gnuCoreutils.users],
  ['vdir', gnuCoreutils.vdir],
  ['vmstat', openbsd.vmstat],
  ['wait', bashBuiltin.wait],
  ['wall', openbsd.wall],
  ['wc', gnuCoreutils.wc],
  ['whatis', openbsd.whatis],
  ['who', gnuCoreutils.who],
  ['whoami', gnuCoreutils.whoami],
  ['yarn', yarn],
  ['yes', gnuCoreutils.yes],
  ['zcat', openbsd.zcat],
]);

export const baseCommandNames = Array.from(baseCommandToFetcher.keys());
