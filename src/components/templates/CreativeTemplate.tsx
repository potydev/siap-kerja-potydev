import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  data: CVData;
}

export const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const { personalData, profilSingkat, pendidikan, pengalaman, skills, sertifikat } = data;

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] w-full max-w-[210mm] mx-auto font-sans text-sm flex">
      {/* Sidebar */}
      <aside className="w-1/3 bg-gradient-to-b from-violet-600 to-purple-700 text-white p-5">
        {/* Photo */}
        <div className="mb-5 text-center">
          {personalData.foto ? (
            <img
              src={personalData.foto}
              alt="Foto"
              className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white/30"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/20 mx-auto flex items-center justify-center text-3xl font-bold">
              {personalData.namaLengkap?.charAt(0) || '?'}
            </div>
          )}
        </div>

        {/* Contact */}
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-violet-200">
            Kontak
          </h2>
          <div className="space-y-2 text-xs">
            {personalData.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-violet-300" />
                <span className="break-all">{personalData.email}</span>
              </div>
            )}
            {personalData.noHp && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-violet-300" />
                <span>{personalData.noHp}</span>
              </div>
            )}
            {personalData.alamat && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-violet-300" />
                <span>{personalData.alamat}</span>
              </div>
            )}
            {personalData.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-3 h-3 text-violet-300" />
                <span className="break-all">{personalData.linkedin}</span>
              </div>
            )}
            {personalData.portfolio && (
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 text-violet-300" />
                <span className="break-all">{personalData.portfolio}</span>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-violet-200">
              Skill
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 bg-white/20 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {sertifikat.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3 text-violet-200">
              Sertifikat
            </h2>
            <div className="space-y-2">
              {sertifikat.map((cert) => (
                <div key={cert.id}>
                  <p className="text-xs font-medium">{cert.nama}</p>
                  <p className="text-xs text-violet-200">{cert.penerbit} • {cert.tahun}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="mb-5 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {personalData.namaLengkap || 'Nama Lengkap'}
          </h1>
          {profilSingkat && (
            <p className="text-gray-600 text-xs leading-relaxed mt-2">{profilSingkat}</p>
          )}
        </header>

        {/* Experience */}
        {pengalaman.length > 0 && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-3">
              Pengalaman
            </h2>
            <div className="space-y-3">
              {pengalaman.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-violet-200">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 bg-violet-500 rounded-full"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">{exp.posisi}</p>
                      <p className="text-violet-600 text-xs">{exp.perusahaan}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {exp.tahunMulai} - {exp.tahunSelesai}
                    </span>
                  </div>
                  {exp.deskripsi && (
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed">{exp.deskripsi}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {pendidikan.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-violet-600 uppercase tracking-wider mb-3">
              Pendidikan
            </h2>
            <div className="space-y-2">
              {pendidikan.map((edu) => (
                <div key={edu.id} className="relative pl-4 border-l-2 border-violet-200">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 bg-violet-500 rounded-full"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">{edu.institusi}</p>
                      <p className="text-gray-600 text-xs">{edu.jurusan}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {edu.tahunMasuk} - {edu.tahunLulus}
                    </span>
                  </div>
                  {edu.nilai && <p className="text-xs text-gray-600">IPK: {edu.nilai}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
