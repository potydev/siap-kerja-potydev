import { CVData } from '@/types/cv';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: CVData;
}

export const ModernTemplate = ({ data }: ModernTemplateProps) => {
  const { personalData, profilSingkat, pendidikan, pengalaman, skills, sertifikat } = data;

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] w-full max-w-[210mm] mx-auto font-sans text-sm">
      {/* Header with blue accent */}
      <header className="bg-blue-600 text-white p-6 pb-8">
        <div className="flex items-start gap-4">
          {personalData.foto && (
            <img
              src={personalData.foto}
              alt="Foto"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              {personalData.namaLengkap || 'Nama Lengkap'}
            </h1>
            <div className="flex flex-wrap gap-3 text-xs text-blue-100">
              {personalData.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {personalData.email}
                </span>
              )}
              {personalData.noHp && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {personalData.noHp}
                </span>
              )}
              {personalData.alamat && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {personalData.alamat}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-blue-100 mt-1">
              {personalData.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3" /> {personalData.linkedin}
                </span>
              )}
              {personalData.portfolio && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {personalData.portfolio}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Profile */}
        {profilSingkat && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Profil
            </h2>
            <p className="text-gray-700 text-xs leading-relaxed pl-4">{profilSingkat}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            {/* Experience */}
            {pengalaman.length > 0 && (
              <section className="mb-5">
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Pengalaman
                </h2>
                <div className="space-y-3 pl-4">
                  {pengalaman.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-blue-200 pl-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900 text-xs">{exp.posisi}</p>
                          <p className="text-blue-600 text-xs">{exp.perusahaan}</p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
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
              <section className="mb-5">
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Pendidikan
                </h2>
                <div className="space-y-2 pl-4">
                  {pendidikan.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-blue-200 pl-3">
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
          </div>

          <div>
            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-5">
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Skill
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs"
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
                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Sertifikat
                </h2>
                <div className="space-y-2">
                  {sertifikat.map((cert) => (
                    <div key={cert.id}>
                      <p className="text-xs font-medium text-gray-900">{cert.nama}</p>
                      <p className="text-xs text-gray-600">{cert.penerbit} • {cert.tahun}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
